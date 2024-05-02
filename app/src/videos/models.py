from sqlalchemy import Column, String

from ..database import Base


class Video(Base):
    __tablename__ = "videos"

    id = Column(String, primary_key=True, unique=True)
    title = Column(String)
    description = Column(String)
