import boto3
from fastapi import APIRouter

router = APIRouter()


@router.get("/buckets")
def get_buckets():
    s3 = boto3.resource('s3')
    buckets = s3.buckets.all()
    return {"buckets": [bucket.name for bucket in buckets]}


@router.get("/buckets/{bucket}/folders")
def get_folders(bucket: str):
    s3 = boto3.client('s3')
    objects = s3.list_objects_v2(Bucket=bucket, Delimiter='/')
    folders = objects.get('CommonPrefixes', [])
    return {"folders": folders}
