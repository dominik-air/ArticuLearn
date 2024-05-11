from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from . import models, schemas


async def get_badges(db: AsyncSession) -> list[models.Badge]:
    async with db:
        result = await db.execute(select(models.Badge))
        return result.scalars().all()


async def create_badge(db: AsyncSession, badge: schemas.BadgeCreate) -> models.Badge:
    async with db:
        stmt = select(models.Badge).where(models.Badge.achievement == badge.achievement)
        result = await db.execute(stmt)
        try:
            existing_badge = result.scalars().one()
        except NoResultFound:
            existing_badge = None

        if existing_badge is not None:
            return existing_badge

        new_badge = models.Badge(
           achievement=badge.achievement, image_url=badge.image_url
        )
        db.add(new_badge)
        await db.commit()
        return new_badge
