import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
CONTENT_DIR = ROOT / "content"


def read_json(path: Path):
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def write_json(path: Path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
        handle.write("\n")


def migrate_collection(source_path: Path, target_dir: Path):
    entries = read_json(source_path)
    if not isinstance(entries, list):
        raise ValueError(f"{source_path} must contain a JSON array")

    target_dir.mkdir(parents=True, exist_ok=True)
    for entry in entries:
        entry_id = entry.get("id")
        if not entry_id:
            raise ValueError(f"Missing id in {source_path}")
        write_json(target_dir / f"{entry_id}.json", entry)

    return len(entries)


def main():
    blog_count = migrate_collection(DATA_DIR / "posts.json", CONTENT_DIR / "blog")
    help_count = migrate_collection(DATA_DIR / "help.json", CONTENT_DIR / "help")
    print(f"Migrated legacy data: blog={blog_count}, help={help_count}")


if __name__ == "__main__":
    main()
