from pydantic import BaseModel


class BadgeBase(BaseModel):
    achievement: str
    image_url: str


class BadgeCreate(BadgeBase):
    pass


class Badge(BadgeBase):

    class Config:
        orm_mode = True
