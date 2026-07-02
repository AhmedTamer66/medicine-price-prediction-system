from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas import DrugSearchParams
from app.services import DrugService

router = APIRouter(
    prefix="/drugs",
    tags=["Drugs"],
)


@router.get("")
async def search_drugs(
    params: Annotated[DrugSearchParams, Depends()],
    db: Annotated[Session, Depends(get_db)],
):
    """
    Search for medicines using the external API.

    The results are returned directly to the client while also
    storing medicines, price history, and raw API responses locally.
    """

    service = DrugService(db)

    response = await service.search(params)

    return response