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
    s3 = boto3.client('s3')
    if prefix:
        objects = s3.list_objects_v2(Bucket=bucket, Prefix=prefix, Delimiter='/')
    else:
        objects = s3.list_objects_v2(Bucket=bucket, Delimiter='/')
    common_prefixes = objects.get('CommonPrefixes', [])
    folders = []
    for common_prefix in common_prefixes:
        folder = [part for part in common_prefix['Prefix'].split('/') if part][-1]
        folders.append(folder)
    return {"folders": folders}


@router.get("/buckets/{bucket}/objects")
def get_objects(bucket: str, prefix: str = None) -> ListObjectsV2Response:
    return s3_service.get_objects(bucket, prefix)


@router.get("/buckets/{bucket}/object")
def get_object(bucket: str, key: str):
    s3 = boto3.client('s3')
    res = s3.get_object(Bucket=bucket, Key=key)
    body = res['Body']
    image_bytes = body.read()
    media_type = get_media_type(key)
    return Response(content=image_bytes, media_type=media_type)
