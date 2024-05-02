from sqlalchemy.exc import NoResultFound
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from . import models, schemas


async def get_videos(db: AsyncSession) -> list[models.Video]:
    async with db:
        result = await db.execute(select(models.Video))
        return result.scalars().all()


async def create_video(db: AsyncSession, video: schemas.VideoCreate):
    async with db:
        stmt = select(models.Video).where(models.Video.id == video.id)
        result = await db.execute(stmt)
        try:
            existing_video = result.scalars().one()
        except NoResultFound:
            existing_video = None

        if existing_video is not None:
            return existing_video

        new_video = models.Video(id=video.id, title=video.title, description=video.description)
        db.add(new_video)
        await db.commit()
        return new_video
