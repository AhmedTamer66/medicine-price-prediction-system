from pydantic import BaseModel, ConfigDict


class ExternalDrug(BaseModel):
    commercial_name_en: str
    commercial_name_ar: str
    scientific_name: str
    manufacturer: str
    drug_class: str
    route: str
    price_egp: float

    model_config = ConfigDict(
        extra="ignore",
    )


class Pagination(BaseModel):
    page: int
    limit: int
    total: int
    totalPages: int
    hasMore: bool

    model_config = ConfigDict(
        extra="ignore",
    )


class ExternalApiResponse(BaseModel):
    data: list[ExternalDrug]
    pagination: Pagination

    model_config = ConfigDict(
        extra="ignore",
    )