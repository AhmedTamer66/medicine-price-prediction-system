from pydantic import BaseModel, ConfigDict, Field


class DrugSearchParams(BaseModel):
    search: str | None = None
    manufacturer: str | None = None
    route: str | None = None

    page: int = Field(default=1, ge=1)
    limit: int = Field(default=10, ge=1, le=100)

    model_config = ConfigDict(
        extra="forbid",
    )