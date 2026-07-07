from __future__ import annotations

from datetime import UTC, datetime

from prophet import Prophet
from sqlalchemy.orm import Session

from ml.model_manager import ModelManager
from ml.preprocessing import DataPreprocessor


class ModelTrainer:
    """
    Trains one Prophet model per drug.
    """

    MIN_HISTORY = 1

    def __init__(self, db: Session):
        self.preprocessor = DataPreprocessor(db)
        self.model_manager = ModelManager()

    def train_all(self) -> None:

        drug_ids = self.preprocessor.get_all_drug_ids()

        print(f"Found {len(drug_ids)} drugs.")

        trained = 0
        skipped = 0
        failed = 0

        for drug_id in drug_ids:

            history = self.preprocessor.get_drug_history(drug_id)

            if len(history) < self.MIN_HISTORY:
                skipped += 1
                print(
                    f"Skipping {drug_id}: "
                    f"only {len(history)} records."
                )
                continue

            if history["y"].nunique() < 2:
                skipped += 1
                print(
                    f"Skipping {drug_id}: "
                    "price never changes."
                )
                continue

            model = Prophet(
                daily_seasonality=False,
                weekly_seasonality=True,
                yearly_seasonality=True,
            )

            try:
                model.fit(history)

                metadata = {
                    "drug_id": drug_id,
                    "trained_at": datetime.now(UTC).isoformat(),
                    "training_samples": len(history),
                    "first_record": history["ds"].min().isoformat(),
                    "last_record": history["ds"].max().isoformat(),
                }

                self.model_manager.save(
                    drug_id=drug_id,
                    model=model,
                    metadata=metadata,
                )

                trained += 1

                print(
                    f"✓ Trained {drug_id} "
                    f"({len(history)} samples)"
                )

            except Exception as e:
                failed += 1
                print(f"Failed {drug_id}: {e}")

        print("\nTraining complete.")
        print(f"Trained : {trained}")
        print(f"Skipped : {skipped}")
        print(f"Failed  : {failed}")