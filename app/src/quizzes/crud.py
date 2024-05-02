from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from . import models, schemas


async def get_quizzes(db: AsyncSession) -> list[models.Quiz]:
    async with db:
        result = await db.execute((select(models.Quiz)))
        return result.scalars().all()


async def create_quiz(db: AsyncSession, quiz: schemas.QuizCreate):
    async with db:

        stmt = select(models.Quiz).where(models.Quiz.question == quiz.question)
        result = await db.execute(stmt)
        try:
            existing_quiz = result.scalars().one()
        except NoResultFound:
            existing_quiz = None

        if existing_quiz is not None:
            return existing_quiz

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
