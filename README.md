# S3 Serve

<div align="center">

![Logo](https://raw.githubusercontent.com/robvanderleek/s3serve/refs/heads/main/docs/logo.png)

</div>

<div align="center">

[![Build Status](https://github.com/robvanderleek/s3serve/workflows/main/badge.svg)](https://github.com/robvanderleek/s3serve/actions)
[![CodeLimit](https://github.com/robvanderleek/s3serve/blob/_codelimit_reports/main/badge.svg)](https://github.com/robvanderleek/s3serve/blob/_codelimit_reports/main/codelimit.md)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)

</div>

*A Simple S3 Server 🗄️*

# Quickstart

Install S3 Serve with pipx:

```shell
pipx install s3serve
```

Start S3 Serve:

```shell
s3serve
```

# Development

After installing dependencies with `uv sync`, S3 Serve can be run from the
repository root like this:

```shell
uv run s3serve
```

## Local installation using pipx

To install the development repository locally run:

```shell
pipx install .
```

(add `--force` flag to overwrite current install)

To install the `main` branch locally run:

```shell
pipx install git+https://github.com/robvanderleek/s3serve.git
```

Or to install another branch locally run:

```shell
pipx install git+https://github.com/robvanderleek/s3serve.git@issue-123
``` 
