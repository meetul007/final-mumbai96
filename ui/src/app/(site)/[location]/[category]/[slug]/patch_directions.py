path = "page.jsx"
with open(path) as f:
    src = f.read()

old_import = 'import { isEmbedMapUrl, openableMapUrl } from "@/lib/mapUrl";'
new_import = 'import { isEmbedMapUrl, openableMapUrl, directionsUrl } from "@/lib/mapUrl";'
assert src.count(old_import) == 1, f"import anchor found {src.count(old_import)} times"
src = src.replace(old_import, new_import, 1)

old_var = '  const openMapUrl = openableMapUrl(mapUrl, listing.address);'
new_var = (
    '  const openMapUrl = openableMapUrl(mapUrl, listing.address);\n'
    '  const directionsHref = directionsUrl(mapUrl, listing.address);'
)
assert src.count(old_var) == 1, f"var anchor found {src.count(old_var)} times"
src = src.replace(old_var, new_var, 1)

old_link = '''                      <a
                        href={`https://maps.google.com/dir/?api=1&destination=${encodeURIComponent(
                          listing.address || "",
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-btn"
                      >
                        \U0001F9ED Get Directions
                      </a>'''

if src.count(old_link) == 1:
    new_link = '''                      <a
                        href={directionsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-btn"
                      >
                        \U0001F9ED Get Directions
                      </a>'''
    src = src.replace(old_link, new_link, 1)
    with open(path, "w") as f:
        f.write(src)
    print("page.jsx successfully patched with directionsUrl.")
else:
    idx = src.find("Get Directions")
    print(f"WARNING: link anchor not found (count={src.count(old_link)}). Context:")
    print(src[max(0, idx-400):idx+100])
