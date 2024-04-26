from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession

import src.crud as crud
import src.schemas as schemas
from src.database import AsyncSessionLocal, async_engine, create_tables


async def get_db():
    async with AsyncSessionLocal() as db:
        yield db


async def create_example_videos() -> None:

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

    async with AsyncSessionLocal() as db:
        for video in videos:
            await crud.create_video(db, video)
            print(f"Video: {video=} created!")
        await db.commit()


async def create_example_quizzes() -> None:
    quizzes = [
        schemas.QuizCreate(
            question="Who was in Paris?",
            answers=[
                schemas.QuizAnswerCreate(text="Friends", is_correct=False),
                schemas.QuizAnswerCreate(text="Homies", is_correct=True),
                schemas.QuizAnswerCreate(text="Butterflies", is_correct=False),
                schemas.QuizAnswerCreate(text="Brothers", is_correct=False),
            ],
        )
    ]

    async with AsyncSessionLocal() as db:
        for quiz in quizzes:
            await crud.create_quiz(db, quiz)
            print(f"Quiz: {quiz=} created!")
        await db.commit()


@asynccontextmanager
async def populate_db(app: FastAPI):
    await create_tables(async_engine)

    await create_example_videos()
    await create_example_quizzes()

    yield


app = FastAPI(lifespan=populate_db)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/videos/", response_model=list[schemas.Video])
async def read_videos(db: AsyncSession = Depends(get_db)):
    return await crud.get_videos(db)


@app.get("/api/v1/quizzes/", response_model=list[schemas.Quiz])
async def read_quizzes(db: AsyncSession = Depends(get_db)):
    return await crud.get_quizzes(db)
