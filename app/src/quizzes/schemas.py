from pydantic import BaseModel


class QuizAnswerBase(BaseModel):
    text: str
    is_correct: bool


class QuizAnswerCreate(QuizAnswerBase):
    pass


class QuizAnswer(QuizAnswerBase):
    id: int
    quiz_id: int

    class Config:
        orm_mode = True


class QuizBase(BaseModel):
    question: str


class QuizCreate(QuizBase):
    answers: list[QuizAnswerCreate]


class Quiz(QuizBase):
    id: int
    answers: list[QuizAnswer]

    class Config:
        orm_mode = True
