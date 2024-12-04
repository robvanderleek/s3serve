import pytest

from s3serve.config import config, Environment


@pytest.fixture(autouse=True)
def config_environment():
    config.environment = Environment.LOCAL
