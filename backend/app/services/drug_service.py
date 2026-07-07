from sqlalchemy.orm import Session

from app.repositories import DrugRepository
from app.repositories import HistoryRepository
from app.schemas import DrugSearchParams
from app.schemas import ExternalApiResponse
from .external_api_service import ExternalApiService


class DrugService:
    """Application logic for drug searches."""

    def __init__(self, db: Session):
        self.db = db

        self.drug_repository = DrugRepository(db)
        self.history_repository = HistoryRepository(db)

        self.external_api = ExternalApiService()

    async def search(
            self,
            params: DrugSearchParams,
    ) -> ExternalApiResponse:

        response = await self.external_api.search_drugs(params)

        try:
            for drug_data in response.data:
                drug = self.drug_repository.get_or_create(drug_data)

                self.history_repository.add_price(
                    drug=drug,
                    price=drug_data.price_egp,
                )

                self.history_repository.add_raw_response(
                    drug=drug,
                    response=drug_data.model_dump(),
                )

            self.db.commit()

        except Exception:
            self.db.rollback()
            raise

        return response