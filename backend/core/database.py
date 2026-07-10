from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

engine = create_engine(
    settings.database_url,
    echo=False,
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI dependency that provides a database session.
    """

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def create_tables() -> None:
    """
    Create all database tables.
    """
    import app.models  # noqa: F401

    Base.metadata.create_all(bind=engine)