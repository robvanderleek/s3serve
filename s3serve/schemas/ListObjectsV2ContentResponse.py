from pydantic import BaseModel, Field


class ListObjectsV2ContentResponse(BaseModel):
    key: str = Field(alias='Key')