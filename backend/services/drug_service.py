from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.repositories import DrugRepository, HistoryRepository
from app.schemas import DrugSearchParams, DrugWithId, DrugDetailResponse, PriceHistoryPoint
from app.services.external_api_service import ExternalApiService
from ml.model_manager import ModelManager


class DrugService:
    """Application logic for drug searches and details."""

    def __init__(self, db: Session):
        self.db = db
        self.drug_repo = DrugRepository(db)
        self.history_repo = HistoryRepository(db)
        self.external_api = ExternalApiService()
        self.model_manager = ModelManager()

    async def search(self, params: DrugSearchParams) -> list[DrugWithId]:
        """
        Search the external API, store results locally, and return
        each drug enriched with its internal UUID.
        """
        response = await self.external_api.search_drugs(params)
        enriched = []

        try:
            for drug_data in response.data:
                drug = self.drug_repo.get_or_create(drug_data)

                self.history_repo.add_price(drug, drug_data.price_egp)
                self.history_repo.add_raw_response(drug, drug_data.model_dump())

                enriched.append(
                    DrugWithId(**drug_data.model_dump(), id=drug.id)
                )

            self.db.commit()
        except Exception:
            self.db.rollback()
            raise

        return enriched

    def get_details(self, drug_id: str) -> DrugDetailResponse:
        """
        Retrieve full drug information, including price history and
        a flag indicating whether a prediction model is available.
        """
        drug = self.drug_repo.get_by_id(drug_id)
        if not drug:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Drug not found"
            )

        # Build price history (sorted ascending)
        history_points = [
            PriceHistoryPoint(
                recorded_at=record.recorded_at,
                price_egp=record.price_egp
            )
            for record in drug.price_history
        ]
        history_points.sort(key=lambda x: x.recorded_at)

        # Current price is the last recorded price (if any)
        current_price = history_points[-1].price_egp if history_points else 0.0

        # Check if a trained Prophet model exists
        model_available = self.model_manager.exists(drug_id)

        return DrugDetailResponse(
            id=drug.id,
            commercial_name_en=drug.commercial_name_en,
            commercial_name_ar=drug.commercial_name_ar,
            scientific_name=drug.scientific_name,
            manufacturer=drug.manufacturer,
            drug_class=drug.drug_class,
            route=drug.route,
            price_egp=current_price,
            price_history=history_points,
            model_available=model_available,
        )