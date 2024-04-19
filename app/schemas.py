from pydantic import BaseModel


class VideoBase(BaseModel):
    id: str
    title: str
    description: str


class VideoCreate(VideoBase):
    pass


class Video(VideoBase):

    class Config:
        orm_mode = True


class QuizAnswerBase(BaseModel):
    text: str
    is_correct: bool
    quiz_id: int


class QuizAnswerCreate(QuizAnswerBase):
    pass


class QuizAnswer(QuizAnswerBase):
    id: int

    class Config:
        orm_mode = True


class QuizBase(BaseModel):
    id: int
    question: str
    answers: list[QuizAnswer]
