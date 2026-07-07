from __future__ import annotations

import json
from pathlib import Path

import joblib


class ModelManager:
    """
    Handles saving and loading Prophet models.
    """

    MODEL_DIR = Path("models")

    def __init__(self):
        self.MODEL_DIR.mkdir(parents=True, exist_ok=True)

    def save(
        self,
        drug_id: str,
        model,
        metadata: dict,
    ) -> None:

        folder = self.MODEL_DIR / drug_id
        folder.mkdir(parents=True, exist_ok=True)

        joblib.dump(
            model,
            folder / "model.joblib",
        )

        with open(
            folder / "metadata.json",
            "w",
            encoding="utf-8",
        ) as f:
            json.dump(
                metadata,
                f,
                indent=4,
            )

    def load(self, drug_id: str):

        path = (
            self.MODEL_DIR
            / drug_id
            / "model.joblib"
        )

        if not path.exists():
            raise FileNotFoundError(
                f"No model found for {drug_id}"
            )

        return joblib.load(path)

    def metadata(self, drug_id: str):

        path = (
            self.MODEL_DIR
            / drug_id
            / "metadata.json"
        )

        if not path.exists():
            return None

        with open(path, encoding="utf-8") as f:
            return json.load(f)

    def exists(self, drug_id: str) -> bool:
        return (
            self.MODEL_DIR
            / drug_id
            / "model.joblib"
        ).exists()

    def delete(self, drug_id: str) -> None:

        folder = self.MODEL_DIR / drug_id

        if not folder.exists():
            return

        for file in folder.iterdir():
            file.unlink()

        folder.rmdir()