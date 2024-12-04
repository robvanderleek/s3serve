import boto3
from fastapi import APIRouter
from starlette.responses import Response

from s3serve.schemas.ListObjectsV2Response import ListObjectsV2Response
from s3serve.services import s3_service
from s3serve.utils import get_media_type

router = APIRouter()


@router.get("/buckets")
def get_buckets():
    buckets = s3_service.get_buckets()
    return {"buckets": [bucket['Name'] for bucket in buckets]}


@router.get("/buckets/{bucket}/folders")
def get_folders(bucket: str, prefix: str = None):
    objects = s3_service.get_objects(bucket, prefix)
    folders = []
    for common_prefix in objects.commonPrefixes:
        folder = [part for part in common_prefix.prefix.split('/') if part][-1]
        folders.append(folder)
    return {"folders": folders}


@router.get("/buckets/{bucket}/objects", response_model_exclude_none=True)
def get_objects(bucket: str, prefix: str = None, token: str = None) -> ListObjectsV2Response:
    return s3_service.get_objects(bucket, prefix, token)


@router.get("/buckets/{bucket}/object")
def get_object(bucket: str, key: str):
    s3 = boto3.client('s3')
    res = s3.get_object(Bucket=bucket, Key=key)
    body = res['Body']
    image_bytes = body.read()
    media_type = get_media_type(key)
    return Response(content=image_bytes, media_type=media_type)
