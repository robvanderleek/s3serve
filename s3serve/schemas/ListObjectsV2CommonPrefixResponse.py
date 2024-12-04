from pydantic import BaseModel, Field


class ListObjectsV2CommonPrefixResponse(BaseModel):
    prefix: str = Field(alias='Prefix')