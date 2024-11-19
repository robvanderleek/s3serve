from moto import mock_aws
from starlette.testclient import TestClient

from s3serve.app import app

client = TestClient(app)


@mock_aws
def test_get_buckets_no_buckets():
    res = client.get("/api/v1/buckets")

    assert res.json() == {"buckets": []}


def test_get_buckets(s3):
    s3.create_bucket(Bucket='test-bucket')

    res = client.get("/api/v1/buckets")

    assert res.json() == {"buckets": ["test-bucket"]}


def test_get_folders_no_folders(s3):
    s3.create_bucket(Bucket='test-bucket')
    res = client.get("/api/v1/buckets/test-bucket/folders")

    assert res.json() == {"folders": []}


def test_get_folders_single_folder(s3):
    s3.create_bucket(Bucket='test-bucket')
    s3.put_object(Bucket='test-bucket', Key='folder/')

    res = client.get("/api/v1/buckets/test-bucket/folders")

    assert res.json() == {"folders": ["folder"]}


def test_get_folders_nested_folders(s3):
    s3.create_bucket(Bucket='test-bucket')
    s3.put_object(Bucket='test-bucket', Key='folder/foo/')
    s3.put_object(Bucket='test-bucket', Key='folder/bar/')

    res = client.get("/api/v1/buckets/test-bucket/folders")

    assert res.json() == {"folders": ["folder"]}

    res = client.get("/api/v1/buckets/test-bucket/folders", params={"prefix": "folder/"})

    result = res.json()['folders']
    assert 'foo' in result
    assert 'bar' in result


def test_get_folders_incomplete_prefix(s3):
    s3.create_bucket(Bucket='test-bucket')
    s3.put_object(Bucket='test-bucket', Key='folder/')

    res = client.get("/api/v1/buckets/test-bucket/folders", params={"prefix": "fold"})

    assert res.json() == {"folders": ["folder"]}
