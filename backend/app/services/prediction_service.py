from ml.predictor import PricePredictor

from app.schemas.prediction import (
    PredictionPoint,
    PredictionResponse,
)


class PredictionService:

    def __init__(self):
        self.predictor = PricePredictor()

    def predict(
        self,
        drug_id: str,
        days: int = 30,
    ) -> PredictionResponse:

        forecast = self.predictor.predict(
            drug_id=drug_id,
            periods=days,
        )

        points = [
            PredictionPoint(
                date=row["ds"],
                predicted_price=round(float(row["yhat"]), 2),
                lower_bound=round(float(row["yhat_lower"]), 2),
                upper_bound=round(float(row["yhat_upper"]), 2),
            )
            for _, row in forecast.iterrows()
        ]

        return PredictionResponse(
            drug_id=drug_id,
            days=days,
            forecast=points,
        )