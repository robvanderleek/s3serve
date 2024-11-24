import logging

import boto3
from botocore.exceptions import ClientError

from s3serve.schemas.ListObjectsV2Response import ListObjectsV2Response

s3 = boto3.client('s3')


def get_buckets() -> list[dict]:
    try:
        res = s3.list_buckets(MaxBuckets=1000)
        return res['Buckets']
    except ClientError as e:
        logging.error(e)
        return []


def get_objects(bucket: str, prefix: str = None) -> ListObjectsV2Response:
    try:
        if prefix:
            res = s3.list_objects_v2(Bucket=bucket, Prefix=prefix, MaxKeys=25, Delimiter='/')
        else:
            res = s3.list_objects_v2(Bucket=bucket, MaxKeys=25, Delimiter='/')
        return ListObjectsV2Response(**res)
    except ClientError as e:
        logging.error(e)
        return ListObjectsV2Response()
