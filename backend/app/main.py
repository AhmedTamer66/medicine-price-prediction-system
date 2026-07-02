from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.core.database import create_tables
from app.routers import drug_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(
    title="Drug Price History API",
    description="A simple wrapper around the Egyptian Drug API.",
    version="1.0.0",
    lifespan=lifespan,
)


app.include_router(drug_router)


@app.get("/")
async def root():
    return {
        "message": "Drug Price History API",
        "docs": "/docs",
    }