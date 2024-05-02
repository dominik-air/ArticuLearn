from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..database import Base


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True)
    title = Column(String)

    tags = relationship("ArticleTag", back_populates="article", lazy="subquery")
    contents = relationship("ArticleContent", back_populates="article", lazy="subquery")


class ArticleTag(Base):
    __tablename__ = "article_tags"

    id = Column(Integer, primary_key=True)
    value = Column(String)
    article_id = Column(Integer, ForeignKey("articles.id"))

    article = relationship("Article", back_populates="tags", lazy="subquery")


class ArticleContent(Base):
    __tablename__ = "article_contents"

    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    # table = ...

    article = relationship("Article", back_populates="contents", lazy="subquery")


# TODO: add Table
