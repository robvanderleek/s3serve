import boto3
from fastapi import APIRouter

router = APIRouter()


@router.get("/buckets")
def get_buckets():
    s3 = boto3.resource('s3')
    buckets = s3.buckets.all()
    return {"buckets": [bucket.name for bucket in buckets]}
