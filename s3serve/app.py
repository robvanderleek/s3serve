import secrets
from pathlib import Path

from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBasic
from starlette import status
from starlette.requests import Request
from starlette.staticfiles import StaticFiles

from s3serve.config import config, Environment
from s3serve.routes import buckets


async def verify_credentials(request: Request):
    local_app = config.environment == Environment.LOCAL
    if local_app:
        return
    credentials = await security(request)
    correct_username = secrets.compare_digest(credentials.username, config.basic_auth_username)
    correct_password = secrets.compare_digest(credentials.password, config.basic_auth_password)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Basic"},
        )


class AuthStaticFiles(StaticFiles):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

    async def __call__(self, scope, receive, send) -> None:
        assert scope["type"] == "http"

        request = Request(scope, receive)
        await verify_credentials(request)
        await super().__call__(scope, receive, send)


security = HTTPBasic()

app = FastAPI(title='S3 Serve Web', dependencies=[Depends(security)])
app_api = FastAPI(title='S3 Serve API')

app.mount('/api/v1', app_api, name='api')
app.mount('/', AuthStaticFiles(directory=Path(__file__).resolve().parent.joinpath('web', 'dist'), html=True),
          name='static')

app_api.include_router(buckets.router, dependencies=[Depends(verify_credentials)])
