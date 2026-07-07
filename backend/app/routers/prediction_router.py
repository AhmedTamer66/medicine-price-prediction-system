from typing import Annotated

from fastapi import APIRouter

from app.schemas.prediction import PredictionResponse
from app.services.prediction_service import PredictionService

router = APIRouter(
    prefix="/predictions",
    tags=["Predictions"],
)


@router.get(
    "/{drug_id}",
    response_model=PredictionResponse,
)
def predict_price(
    drug_id: str,
    days: int = 30,
):

    service = PredictionService()

    return service.predict(
        drug_id=drug_id,
        days=days,
    )