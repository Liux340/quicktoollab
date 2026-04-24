import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content"
DATA_DIR = ROOT / "data"


def load_entries(folder: Path):
    entries = []
    for path in sorted(folder.glob("*.json")):
        if path.name == "index.json":
            continue
        with path.open("r", encoding="utf-8") as handle:
            entries.append(json.load(handle))
    return entries


def write_json(path: Path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
        handle.write("\n")


def build_blog():
    entries = load_entries(CONTENT_DIR / "blog")
    entries.sort(key=lambda item: item.get("date", ""), reverse=True)
    write_json(CONTENT_DIR / "blog" / "index.json", entries)
    write_json(DATA_DIR / "posts.json", entries)
    return len(entries)


def build_help():
    entries = load_entries(CONTENT_DIR / "help")
    entries.sort(key=lambda item: item.get("id", ""))
    write_json(CONTENT_DIR / "help" / "index.json", entries)
    write_json(DATA_DIR / "help.json", entries)
    return len(entries)


def main():
    blog_count = build_blog()
    help_count = build_help()
    print(f"Built content indexes: blog={blog_count}, help={help_count}")


if __name__ == "__main__":
    main()
