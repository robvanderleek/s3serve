from s3serve.services.s3_service import get_objects


def test_get_objects(s3):
    s3.create_bucket(Bucket='test-bucket')
    s3.put_object(Bucket='test-bucket', Key='folder/foo')
    s3.put_object(Bucket='test-bucket', Key='folder/bar')

    result = get_objects('test-bucket', 'folder/')

    assert len(result.contents) == 2
    assert result.nextContinuationToken is None


def test_get_objects_next_page(s3):
    s3.create_bucket(Bucket='test-bucket')
    for i in range(27):
        s3.put_object(Bucket='test-bucket', Key=f'folder/foo-{i}')

    result = get_objects('test-bucket', 'folder/')

    assert len(result.contents) == 25
    assert result.nextContinuationToken is not None

    result = get_objects('test-bucket', 'folder/', result.nextContinuationToken)

    assert len(result.contents) == 2
