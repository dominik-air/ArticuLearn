from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import NoResultFound

import models
import schemas


async def get_videos(db: AsyncSession) -> list[models.Video]:
    async with db:
        result = await db.execute(select(models.Video))
        return result.scalars().all()


async def create_video(db: AsyncSession, video: schemas.VideoCreate):
    async with db:
        stmt = select(models.Video).where(models.Video.id == video.id)
        result = await db.execute(stmt)
        try:
            existing_video = result.scalars().one()
        except NoResultFound:
            existing_video = None

        if existing_video is None:
            new_video = models.Video(
                id=video.id, title=video.title, description=video.description
            )
            db.add(new_video)
            await db.commit()
            return new_video

        return existing_video


async def get_quizzes(db: AsyncSession) -> list[models.Quiz]:
    async with db:
        result = await db.execute((select(models.Quiz)))
        return result.scalars().all()


async def create_quiz(db: AsyncSession, quiz: schemas.QuizCreate):
    async with db:
        new_quiz = models.Quiz(question=quiz.question)
        db.add(new_quiz)
        await db.flush()

        for answer_data in quiz.answers:
            new_answer = models.QuizAnswer(
                text=answer_data.text,
                is_correct=answer_data.is_correct,
                quiz_id=new_quiz.id,
            )
            db.add(new_answer)

        await db.commit()
        return new_quiz
