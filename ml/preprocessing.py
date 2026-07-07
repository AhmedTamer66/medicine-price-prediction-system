from __future__ import annotations

import pandas as pd
from sqlalchemy.orm import Session

from app.models.drug import Drug
from app.models.price_history import PriceHistory


class DataPreprocessor:
    """
    Responsible for retrieving and preparing data for Prophet.
    """

    def __init__(self, db: Session):
        self.db = db

    def get_drug_history(self, drug_id: str) -> pd.DataFrame:
        """
        Returns a Prophet-compatible DataFrame.

        Columns:
            ds -> datetime
            y  -> price
        """

        records = (
            self.db.query(PriceHistory)
            .filter(PriceHistory.drug_id == drug_id)
            .order_by(PriceHistory.recorded_at.asc())
            .all()
        )

        if not records:
            return pd.DataFrame(columns=["ds", "y"])

        df = pd.DataFrame(
            [
                {
                    "ds": record.recorded_at,
                    "y": record.price_egp,
                }
                for record in records
            ]
        )

        df["ds"] = pd.to_datetime(df["ds"])

        df = (
            df.drop_duplicates(subset="ds")
            .dropna()
            .sort_values("ds")
            .reset_index(drop=True)
        )

        return df

    def get_all_drug_ids(self) -> list[str]:
        return [
            drug.id
            for drug in self.db.query(Drug).all()
        ]