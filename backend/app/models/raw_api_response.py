from __future__ import annotations

from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class RawApiResponse(Base):
    __tablename__ = "raw_api_responses"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    drug_id: Mapped[str] = mapped_column(
        ForeignKey("drugs.id", ondelete="CASCADE"),
        nullable=False,
    )

    response_json: Mapped[dict] = mapped_column(
        JSON,
        nullable=False,
    )

    retrieved_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )

    drug: Mapped["Drug"] = relationship(
        back_populates="raw_api_responses",
    )