from s3serve.utils import get_media_type


def test_get_media_type():
    assert get_media_type('image.jpg') == 'image/jpeg'
    assert get_media_type('image.png') == 'image/png'
    assert get_media_type('text.txt') == 'text/plain'
    assert get_media_type('file') == 'application/octet-stream'