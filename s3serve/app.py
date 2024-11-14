from pathlib import Path

from fastapi import FastAPI
from starlette.staticfiles import StaticFiles

app = FastAPI()
app.mount('/', StaticFiles(directory=Path(__file__).resolve().parent.joinpath('web', 'dist'), html=True), name='static')


@app.get("/")
def hello_world():
    return {"Hello": "World"}
