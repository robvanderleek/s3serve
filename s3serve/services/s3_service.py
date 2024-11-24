import logging
from typing import Union

import boto3
from botocore.exceptions import ClientError
from mypy_boto3_s3 import S3Client

from s3serve.schemas.ListObjectsV2Response import ListObjectsV2Response

_s3_client: Union[None, S3Client] = None


def s3_client() -> S3Client:
    if _s3_client is None:
        _init_s3_client()
    return _s3_client


def _init_s3_client():
    global _s3_client
    _s3_client = boto3.client('s3')


def get_buckets() -> list[dict]:
    try:
        res = s3_client().list_buckets(MaxBuckets=1000)
        return res['Buckets']
    except ClientError as e:
        logging.error(e)
        return []


def get_objects(bucket: str, prefix: str = None) -> ListObjectsV2Response:
    try:
        if prefix:
            res = s3_client().list_objects_v2(Bucket=bucket, Prefix=prefix, MaxKeys=25, Delimiter='/')
        else:
            res = s3_client().list_objects_v2(Bucket=bucket, MaxKeys=25, Delimiter='/')
        return ListObjectsV2Response(**res)
    except ClientError as e:
        logging.error(e)
        return ListObjectsV2Response()
