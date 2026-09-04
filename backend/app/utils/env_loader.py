import yaml
import os
from pathlib import Path


def load_env_from_yaml(path="env.yml"):
    file_path = Path(path)

    if not file_path.exists():
        raise FileNotFoundError(f"{path} not found")

    with open(file_path, "r") as f:
        data = yaml.safe_load(f)

    def flatten(prefix, obj):
        for key, value in obj.items():
            if isinstance(value, dict):
                flatten(f"{prefix}{key}_", value)
            else:
                os.environ[f"{prefix}{key}".upper()] = str(value)

    for section, values in data.items():
        flatten(f"{section}_", values)
