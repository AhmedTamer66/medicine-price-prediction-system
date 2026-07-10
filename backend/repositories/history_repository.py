from sqlalchemy.orm import Session

from app.models import Drug
from app.models import PriceHistory
from app.models import RawApiResponse


class HistoryRepository:
    """Database operations for historical records."""

    def __init__(self, db: Session):
        self.db = db

    def add_price(
        self,
        drug: Drug,
        price: float,
    ) -> PriceHistory:
        history = PriceHistory(
            drug_id=drug.id,
            price_egp=price,
        )

        self.db.add(history)

        return history

    def add_raw_response(
        self,
        drug: Drug,
        response: dict,
    ) -> RawApiResponse:
        raw = RawApiResponse(
            drug_id=drug.id,
            response_json=response,
        )

        self.db.add(raw)

        return raw