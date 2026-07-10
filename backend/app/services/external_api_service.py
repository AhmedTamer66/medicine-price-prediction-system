from fastapi import HTTPException, status
from httpx import AsyncClient, HTTPStatusError, RequestError

from app.core.config import settings
from app.schemas import DrugSearchParams, ExternalApiResponse


class ExternalApiService:
    """Handles communication with the external drug API."""

    async def search_drugs(
        self,
        params: DrugSearchParams,
    ) -> ExternalApiResponse:
        """
        Search the external API and validate the response.
        """

        headers = {
            "Authorization": f"Bearer {settings.api_key}",
        }

        query_params = params.model_dump(exclude_none=True)

        try:
            async with AsyncClient(timeout=settings.request_timeout) as client:
                response = await client.get(
                    settings.external_api_url,
                    headers=headers,
                    params=query_params,
                )

                response.raise_for_status()

        except HTTPStatusError as exc:
            raise HTTPException(
                status_code=exc.response.status_code,
                detail="The external API returned an error.",
            ) from exc

        except RequestError as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Unable to connect to the external API: {exc}",
            ) from exc

        try:
            return ExternalApiResponse.model_validate(response.json())

        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="The external API returned an invalid response.",
            ) from exc