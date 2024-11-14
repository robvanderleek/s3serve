import boto3
from moto import mock_aws
from starlette.testclient import TestClient

from s3serve.app import app

client = TestClient(app)

@mock_aws
def test_get_buckets():
    s3 = boto3.resource('s3')
    s3.create_bucket(Bucket='test-bucket')

    res = client.get("/api/v1/buckets")

    assert res.json() == {"buckets": ["test-bucket"]}