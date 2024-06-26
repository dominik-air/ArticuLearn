from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..database import Base


class Quiz(Base):
    __tablename__ = "quizes"

    id = Column(Integer, primary_key=True, unique=True)
    question = Column(String, unique=True)

    answers = relationship("QuizAnswer", back_populates="quiz", lazy="subquery")


class QuizAnswer(Base):
    __tablename__ = "quiz_answers"

    id = Column(Integer, primary_key=True)
    text = Column(String)
    is_correct = Column(Boolean, default=False)
    quiz_id = Column(Integer, ForeignKey("quizes.id"))

    quiz = relationship("Quiz", back_populates="answers", lazy="subquery")
