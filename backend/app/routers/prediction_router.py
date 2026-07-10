from typing import Annotated

from fastapi import APIRouter, HTTPException, status

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
    """
    Return a price forecast for the given drug.
    Returns 404 if no trained model exists for that drug.
    """
    service = PredictionService()
    try:
        return service.predict(drug_id=drug_id, days=days)
    except FileNotFoundError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No trained model found for drug {drug_id}. Please train the model first."
        )