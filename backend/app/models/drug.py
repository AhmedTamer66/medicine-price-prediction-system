from __future__ import annotations

import uuid
from datetime import UTC, datetime

from sqlalchemy import DateTime, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Drug(Base):
    __tablename__ = "drugs"

    __table_args__ = (
        UniqueConstraint(
            "commercial_name_en",
            "manufacturer",
            "route",
            name="uq_drug_identity",
        ),
    )

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
    )

    commercial_name_en: Mapped[str] = mapped_column(String(255), nullable=False)
    commercial_name_ar: Mapped[str] = mapped_column(String(255), nullable=False)
    scientific_name: Mapped[str] = mapped_column(String(255), nullable=False)
    manufacturer: Mapped[str] = mapped_column(String(255), nullable=False)
    drug_class: Mapped[str] = mapped_column(String(255), nullable=False)
    route: Mapped[str] = mapped_column(String(100), nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),
        nullable=False,
    )

    price_history: Mapped[list["PriceHistory"]] = relationship(
        back_populates="drug",
        cascade="all, delete-orphan",
    )

    raw_api_responses: Mapped[list["RawApiResponse"]] = relationship(
        back_populates="drug",
        cascade="all, delete-orphan",
    )