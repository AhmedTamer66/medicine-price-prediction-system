from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from the .env file."""

    database_url: str = Field(alias="DATABASE_URL")

    external_api_url: str = Field(alias="EXTERNAL_API_URL")

    api_key: str = Field(alias="API_KEY")

    request_timeout: int = Field(default=30, alias="REQUEST_TIMEOUT")

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance."""
    return Settings()


settings = get_settings()