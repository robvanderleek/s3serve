import pyperclip
import typer
import uvicorn

from s3serve.config import config, Environment

def serve(port: int = 8080):
    local_app = config.environment == Environment.LOCAL
    if not local_app:
        pyperclip.copy(config.basic_auth_password)
        print(f'Basic Auth Username: {config.basic_auth_username}')
        print(f'Basic Auth Password: {config.basic_auth_password} (copied to clipboard)', )
    uvicorn.run('s3serve.app:app', host='0.0.0.0', port=port, reload=local_app, reload_dirs=['s3serve'])

def main():
    typer.run(serve)
