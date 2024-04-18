from contextlib import asynccontextmanager
from fastapi import Depends, FastAPI
from sqlalchemy.ext.asyncio import AsyncSession

import crud
import schemas
from database import async_engine, AsyncSessionLocal, create_tables


async def get_db():
    async with AsyncSessionLocal() as db:
        yield db


@asynccontextmanager
async def populate_db(app: FastAPI):

    await create_tables(async_engine)

    async with AsyncSessionLocal() as db:
        videos = [
            schemas.VideoCreate(
                id="dQw4w9WgXcQ",
                title="Example Video 1",
                description="This is a sample video description.",
            ),
            schemas.VideoCreate(
                id="4uLs4Ow6UF0",
                title="Example Video 2",
                description="This is a sample video description.",
            ),
            schemas.VideoCreate(
                id="8CwB4T1nkaM",
                title="Example Video 3",
                description="This is a sample video description.",
            ),
        ]

        for video in videos:
            await crud.create_video(db, video)
            print(f"Video: {video=} created!")
        await db.commit()
        yield


app = FastAPI(lifespan=populate_db)


@app.get("/api/v1/videos/", response_model=list[schemas.Video])
async def read_videos(db: AsyncSession = Depends(get_db)):
    return await crud.get_videos(db)
