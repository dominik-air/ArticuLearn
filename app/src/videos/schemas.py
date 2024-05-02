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
