from __future__ import annotations

from prophet import Prophet

from ml.model_manager import ModelManager


class PricePredictor:
    """
    Performs inference using trained Prophet models.
    """

    def __init__(self):
        self.model_manager = ModelManager()

    def predict(
        self,
        drug_id: str,
        periods: int = 30,
        freq: str = "D",
    ):

        model: Prophet = self.model_manager.load(drug_id)

        future = model.make_future_dataframe(
            periods=periods,
            freq=freq,
        )

        forecast = model.predict(future)

        # Return only the future predictions
        return (
            forecast.tail(periods)[
                [
                    "ds",
                    "yhat",
                    "yhat_lower",
                    "yhat_upper",
                ]
            ]
            .reset_index(drop=True)
        )