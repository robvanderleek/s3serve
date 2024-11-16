import uvicorn

from s3serve.config import config


def main():
    reload = config.environment == config.Environment.LOCAL
    uvicorn.run('s3serve.app:app', host='0.0.0.0', port=8080, reload=reload, reload_dirs=['s3serve'])
