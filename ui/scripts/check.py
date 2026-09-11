import os, json
from bs4 import BeautifulSoup

# Project root nikaalo (scripts folder ke ek level upar)
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_ROOT = os.path.join(PROJECT_ROOT, 'src', 'data', 'location', '75 locations pages')
JSON_DIR = os.path.join(PROJECT_ROOT, 'src', 'data', 'live-location')

print(f"HTML: {HTML_ROOT}")
print(f"JSON: {JSON_DIR}")
print()

print(f"{'FILE':<30} {'HTML':<8} {'JSON':<8} {'DIFF':<8} {'STATUS':<6}")
print('-' * 65)

for root, dirs, files in os.walk(HTML_ROOT):
    for f in sorted(files):
        if f.startswith('._') or not f.endswith('.html'):
            continue
        
        html_path = os.path.join(root, f)
        json_path = os.path.join(JSON_DIR, f.replace('.html', '.json'))
        
        with open(html_path, 'r', encoding='utf-8') as fh:
            soup = BeautifulSoup(fh.read(), 'lxml')
        
        html_slugs = set()
        for a in soup.find_all('a', class_='cat-card'):
            href = a.get('href', '')
            slug = href.rstrip('/').split('/')[-1] if href else ''
            if slug:
                html_slugs.add(slug)
        
        json_slugs = set()
        try:
            with open(json_path, 'r', encoding='utf-8') as fj:
                d = json.load(fj)
            for g in d.get('category_groups', []):
                for c in g.get('categories', []):
                    json_slugs.add(c['slug'])
        except:
            pass
        
        diff = len(html_slugs) - len(json_slugs)
        marker = 'OK' if diff == 0 else ('WARN' if abs(diff) < 5 else 'BAD')
        print(f"{f:<30} {len(html_slugs):<8} {len(json_slugs):<8} {diff:<8} {marker}")
        
        if diff > 0:
            missing = html_slugs - json_slugs
            print(f"   Missing: {sorted(missing)[:15]}")