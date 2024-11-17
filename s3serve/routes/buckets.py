import boto3
from fastapi import APIRouter

router = APIRouter()


@router.get("/buckets")
def get_buckets():
    s3 = boto3.client('s3')
    res = s3.list_buckets(MaxBuckets=1000)
    buckets = res['Buckets']
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
def get_objects(bucket: str, prefix: str = None):
    s3 = boto3.client('s3')
    objects = s3.list_objects_v2(Bucket=bucket, Prefix=prefix, MaxKeys=25, Delimiter='/')
    folders = objects.get('CommonPrefixes', [])
    return {"folders": [folders['Prefix'] for folders in folders]}
