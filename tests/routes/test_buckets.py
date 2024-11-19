import boto3
from moto import mock_aws
from starlette.testclient import TestClient

from s3serve.app import app

client = TestClient(app)
s3 = boto3.resource('s3', region_name='us-east-1')

@mock_aws
def test_get_buckets_no_buckets():
    res = client.get("/api/v1/buckets")

    assert res.json() == {"buckets": []}


@mock_aws
def test_get_buckets():
    s3.create_bucket(Bucket='test-bucket')

    res = client.get("/api/v1/buckets")

    assert res.json() == {"buckets": ["test-bucket"]}


@mock_aws
def test_get_folders_no_folders():
    s3.create_bucket(Bucket='test-bucket')
    res = client.get("/api/v1/buckets/test-bucket/folders")

    assert res.json() == {"folders": []}


@mock_aws
def test_get_folders_single_folder():
    bucket = s3.create_bucket(Bucket='test-bucket')
    bucket.put_object(Key='folder/')

    res = client.get("/api/v1/buckets/test-bucket/folders")

    assert res.json() == {"folders": ["folder"]}


@mock_aws
def test_get_folders_nested_folders():
    bucket = s3.create_bucket(Bucket='test-bucket')
    bucket.put_object(Key='folder/foo/')
    bucket.put_object(Key='folder/bar/')

    res = client.get("/api/v1/buckets/test-bucket/folders")

    assert res.json() == {"folders": ["folder"]}

    res = client.get("/api/v1/buckets/test-bucket/folders", params={"prefix": "folder/"})

    result = res.json()['folders']
    assert 'foo' in result
    assert 'bar' in result

@mock_aws
def test_get_folders_incomplete_prefix():
    bucket = s3.create_bucket(Bucket='test-bucket')
    bucket.put_object(Key='folder/')

    res = client.get("/api/v1/buckets/test-bucket/folders", params={"prefix": "fold"})

    assert res.json() == {"folders": ["folder"]}
