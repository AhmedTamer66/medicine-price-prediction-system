from typing import Annotated, List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas import DrugSearchParams, DrugWithId, DrugDetailResponse
from app.services import DrugService

router = APIRouter(
    prefix="/drugs",
    tags=["Drugs"],
)


@router.get("", response_model=List[DrugWithId])
async def search_drugs(
    params: Annotated[DrugSearchParams, Depends()],
    db: Annotated[Session, Depends(get_db)],
):
    """
    Search for medicines using the external API.
    Returns a list of drugs enriched with internal UUIDs.
    """
    service = DrugService(db)
    return await service.search(params)


@router.get("/{drug_id}", response_model=DrugDetailResponse)
def get_drug_details(
    drug_id: str,
    db: Annotated[Session, Depends(get_db)],
):
    """
    Get full details for a specific drug, including price history
    and whether a prediction model is available.
    """
    service = DrugService(db)
    return service.get_details(drug_id)