from sqlalchemy import Column, String

from ..database import Base


class Badge(Base):
    __tablename__ = "badges"

    achievement = Column(String, primary_key=True, unique=True)
    image_url = Column(String)
