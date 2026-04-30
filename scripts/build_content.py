import json
from datetime import date
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT_DIR = ROOT / "content"
DATA_DIR = ROOT / "data"
BASE_URL = "https://quicktoollab.top"

STATIC_PAGES = [
    {"loc": "/", "changefreq": "daily", "priority": "1.0"},
    {"loc": "/blog.html", "changefreq": "weekly", "priority": "0.9"},
    {"loc": "/compress.html", "changefreq": "monthly", "priority": "0.8"},
    {"loc": "/help.html", "changefreq": "weekly", "priority": "0.7"},
    {"loc": "/about.html", "changefreq": "monthly", "priority": "0.5"},
    {"loc": "/privacy.html", "changefreq": "yearly", "priority": "0.3"},
]


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


def build_sitemap():
    today = date.today().isoformat()

    blog_entries = json.loads((CONTENT_DIR / "blog" / "index.json").read_text(encoding="utf-8"))
    help_entries = json.loads((CONTENT_DIR / "help" / "index.json").read_text(encoding="utf-8"))

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]

    # Static pages
    for page in STATIC_PAGES:
        lines.append(
            f'  <url><loc>{BASE_URL}{page["loc"]}</loc>'
            f'<lastmod>{today}</lastmod>'
            f'<changefreq>{page["changefreq"]}</changefreq>'
            f'<priority>{page["priority"]}</priority></url>'
        )

    # Dynamic blog posts
    for entry in blog_entries:
        entry_id = entry.get("id", "")
        entry_date = entry.get("date", today)
        lines.append(
            f'  <url><loc>{BASE_URL}/blog-post.html?id={entry_id}</loc>'
            f'<lastmod>{entry_date}</lastmod>'
            f'<changefreq>weekly</changefreq>'
            f'<priority>0.8</priority></url>'
        )

    # Dynamic help articles
    for entry in help_entries:
        entry_id = entry.get("id", "")
        lines.append(
            f'  <url><loc>{BASE_URL}/help-article.html?id={entry_id}</loc>'
            f'<lastmod>{today}</lastmod>'
            f'<changefreq>monthly</changefreq>'
            f'<priority>0.6</priority></url>'
        )

    lines.append('</urlset>')

    sitemap_path = ROOT / "sitemap.xml"
    sitemap_path.write_text("\n".join(lines) + "\n", encoding="utf-8")

    total_dynamic = len(blog_entries) + len(help_entries)
    return total_dynamic


def main():
    blog_count = build_blog()
    help_count = build_help()
    dynamic_count = build_sitemap()
    print(f"Built content indexes: blog={blog_count}, help={help_count}")
    print(f"Generated sitemap.xml: {len(STATIC_PAGES)} static + {dynamic_count} dynamic URLs")


if __name__ == "__main__":
    main()
