from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

from .external_api import ExternalDrug


class DrugSearchParams(BaseModel):
    search: str | None = None
    manufacturer: str | None = None
    route: str | None = None

    page: int = Field(default=1, ge=1)
    limit: int = Field(default=10, ge=1, le=100)

    model_config = ConfigDict(extra="forbid")


class DrugWithId(ExternalDrug):
    """External drug data enriched with internal UUID."""
    id: str


class PriceHistoryPoint(BaseModel):
    recorded_at: datetime
    price_egp: float


class DrugDetailResponse(DrugWithId):
    """Full drug details including price history and model availability."""
    price_history: list[PriceHistoryPoint]
    model_available: bool