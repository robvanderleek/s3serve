from typing import Optional

from pydantic import BaseModel, Field

from s3serve.schemas.ListObjectsV2ContentResponse import ListObjectsV2ContentResponse


class ListObjectsV2Response(BaseModel):
    isTruncated: bool = Field(False, alias='IsTruncated')
    contents: list[ListObjectsV2ContentResponse] = Field([], alias='Contents')
    nextContinuationToken: Optional[str] = Field(None, alias='NextContinuationToken')
