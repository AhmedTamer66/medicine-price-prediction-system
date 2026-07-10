from datetime import datetime

from pydantic import BaseModel


class PredictionPoint(BaseModel):
    date: datetime
    predicted_price: float
    lower_bound: float
    upper_bound: float


class PredictionResponse(BaseModel):
    drug_id: str
    days: int
    forecast: list[PredictionPoint]