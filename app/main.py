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

async def create_example_articles() -> None:
    articles = [
        schemas.ArticleWithRelations(
            title="Understanding AI",
            tags=[
                schemas.ArticleTagCreate(value="Technology"),
                schemas.ArticleTagCreate(value="AI")
            ],
            contents=[
                schemas.ArticleContentCreate(text="A comprehensive guide to Artificial Intelligence.", image_url=None)
            ]
        ),
        schemas.ArticleWithRelations(
            title="Latest Trends in Machine Learning",
            tags=[
                schemas.ArticleTagCreate(value="Machine Learning"),
                schemas.ArticleTagCreate(value="Data Science")
            ],
            contents=[
                schemas.ArticleContentCreate(text="Exploring the latest breakthroughs in ML.", image_url="http://example.com/ml.png"),
                schemas.ArticleContentCreate(text=None, image_url="http://example.com/data.png")
            ]
        ),
        schemas.ArticleWithRelations(
            title="History of Computing",
            tags=[
                schemas.ArticleTagCreate(value="Computing"),
                schemas.ArticleTagCreate(value="History")
            ],
            contents=[
                schemas.ArticleContentCreate(text="From the abacus to quantum computing.", image_url=None)
            ]
        )
    ]

    async with AsyncSessionLocal() as db:
        for article in articles:
            created_article = await crud.create_article(db, article)
            print(f"Article created! Title: {created_article.title}")
        await db.commit()


@asynccontextmanager
async def populate_db(app: FastAPI):
    await create_tables(async_engine)

    await create_example_videos()
    await create_example_quizzes()
    await create_example_articles()

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

@app.get("/api/v1/articles/", response_model=list[schemas.Article])
async def read_articles(db: AsyncSession = Depends(get_db)):
    return await crud.get_articles(db)
