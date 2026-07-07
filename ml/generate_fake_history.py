from __future__ import annotations

import random
from datetime import timedelta

from app.core.database import SessionLocal
from app.models.drug import Drug
from app.models.price_history import PriceHistory

# Total number of price records each drug should have
TARGET_HISTORY = 365

# Chance that a price changes on a given day
PRICE_CHANGE_PROBABILITY = 0.03

# Price increase range (5% - 15%)
MIN_INCREASE = 0.05
MAX_INCREASE = 0.15

# Rare decrease range (1% - 3%)
MIN_DECREASE = 0.01
MAX_DECREASE = 0.03


def generate_history() -> None:

    with SessionLocal() as db:

        drugs = db.query(Drug).all()

        print(f"Found {len(drugs)} drugs.\n")

        total_inserted = 0

        for drug in drugs:

            history = (
                db.query(PriceHistory)
                .filter(PriceHistory.drug_id == drug.id)
                .order_by(PriceHistory.recorded_at.asc())
                .all()
            )

            if not history:
                print(
                    f"Skipping {drug.commercial_name_en}: "
                    "no price history."
                )
                continue

            current_count = len(history)

            if current_count >= TARGET_HISTORY:
                print(
                    f"Skipping {drug.commercial_name_en}: "
                    f"{current_count} records already."
                )
                continue

            missing = TARGET_HISTORY - current_count

            oldest = history[0]

            current_price = oldest.price_egp
            current_date = oldest.recorded_at

            fake_records = []

            for _ in range(missing):

                current_date -= timedelta(days=1)

                if random.random() < PRICE_CHANGE_PROBABILITY:

                    if random.random() < 0.90:
                        # Going backwards means prices decrease
                        percent = random.uniform(
                            MIN_INCREASE,
                            MAX_INCREASE,
                        )

                        current_price /= (1 + percent)

                    else:
                        # Rare correction
                        percent = random.uniform(
                            MIN_DECREASE,
                            MAX_DECREASE,
                        )

                        current_price /= (1 - percent)

                current_price = max(current_price, 1)

                fake_records.append(
                    PriceHistory(
                        drug_id=drug.id,
                        price_egp=round(current_price, 2),
                        recorded_at=current_date,
                    )
                )

            db.add_all(fake_records)

            total_inserted += len(fake_records)

            print(
                f"{drug.commercial_name_en:<40}"
                f"+{len(fake_records):4} records "
                f"({current_count} → {TARGET_HISTORY})"
            )

        db.commit()

        print("\n" + "=" * 60)
        print("Finished generating fake history.")
        print(f"Inserted {total_inserted} records.")
        print("=" * 60)


if __name__ == "__main__":
    generate_history()