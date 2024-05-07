from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from . import models, schemas


async def get_articles(db: AsyncSession) -> list[models.Article]:
    async with db:
        result = await db.execute(select(models.Article))
        return result.scalars().all()


async def create_article(db: AsyncSession, article: schemas.ArticleWithRelations):
    async with db:
        stmt = select(models.Article).where(models.Article.title == article.title)
        result = await db.execute(stmt)
        try:
            existing_article = result.scalars().one()
        except NoResultFound:
            existing_article = None

        if existing_article is not None:
            return existing_article

        new_article = models.Article(title=article.title)
        db.add(new_article)
        await db.flush()

        for tag_data in article.tags:
            new_tag = models.ArticleTag(value=tag_data.value, article_id=new_article.id)
            db.add(new_tag)

        for content_data in article.contents:
            new_content = models.ArticleContent(
                text=content_data.text,
                image_url=content_data.image_url,
                table_id=content_data.table_id,
                article_id=new_article.id,
            )
            db.add(new_content)

        await db.commit()
        return new_article
