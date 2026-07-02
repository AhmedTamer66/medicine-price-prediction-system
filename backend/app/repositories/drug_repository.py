from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Drug
from app.schemas.external_api import ExternalDrug


class DrugRepository:
    """Database operations for Drug."""

    def __init__(self, db: Session):
        self.db = db

    def get_by_identity(
        self,
        commercial_name_en: str,
        manufacturer: str,
        route: str,
    ) -> Drug | None:
        statement = (
            select(Drug)
            .where(Drug.commercial_name_en == commercial_name_en)
            .where(Drug.manufacturer == manufacturer)
            .where(Drug.route == route)
        )

        return self.db.scalar(statement)

    def create(self, drug_data: ExternalDrug) -> Drug:
        drug = Drug(
            commercial_name_en=drug_data.commercial_name_en,
            commercial_name_ar=drug_data.commercial_name_ar,
            scientific_name=drug_data.scientific_name,
            manufacturer=drug_data.manufacturer,
            drug_class=drug_data.drug_class,
            route=drug_data.route,
        )

        self.db.add(drug)
        self.db.flush()

        return drug

    def get_or_create(self, drug_data: ExternalDrug) -> Drug:
        drug = self.get_by_identity(
            commercial_name_en=drug_data.commercial_name_en,
            manufacturer=drug_data.manufacturer,
            route=drug_data.route,
        )

        if drug:
            return drug

        return self.create(drug_data)