from pydantic import BaseModel


class ArticleTagBase(BaseModel):
    value: str


class ArticleTagCreate(ArticleTagBase):
    pass


class ArticleTag(ArticleTagBase):
    id: int
    article_id: int

    class Config:
        orm_mode = True


class ArticleContentBase(BaseModel):
    text: str | None
    image_url: str | None


class ArticleContentCreate(ArticleContentBase):
    table_id: int | None


class ArticleContent(ArticleContentBase):
    id: int
    article_id: int
    table_id: int | None

    class Config:
        orm_mode = True


class ArticleTableBase(BaseModel):
    headers: str  # CSV format
    values: str  # CSV format


class ArticleTableCreate(ArticleTableBase):
    pass


class ArticleTable(ArticleTableBase):
    id: int

    class Config:
        orm_mode = True


class ArticleBase(BaseModel):
    title: str


class ArticleCreate(ArticleBase):
    pass


class Article(ArticleBase):
    id: int
    tags: list[ArticleTag]
    contents: list[ArticleContent]

    class Config:
        orm_mode = True


class ArticleWithRelations(ArticleCreate):
    tags: list[ArticleTagCreate]
    contents: list[ArticleContentCreate]
