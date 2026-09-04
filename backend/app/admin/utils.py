import re
from app.listing.models import Blog
from datetime import datetime
from slugify import slugify
from app import db
from bs4 import BeautifulSoup

from flask import request
from app.helper.file import upload_single_image


def save_blog(blog=None):
    if not blog:
        blog = Blog()

    blog.title = request.form.get("title")
    blog.slug = request.form.get("slug") or slugify(blog.title)

    blog.excerpt = request.form.get("excerpt")

    blog.author_name = request.form.get("author_name")
    blog.author_tagline = request.form.get("author_tagline")
    blog.author_bio = request.form.get("author_bio")

    blog.seo_title = request.form.get("seo_title")
    blog.seo_description = request.form.get("seo_description")

    blog.is_published = bool(request.form.get("is_published"))

    # hashtags
    hashtags = request.form.get("hashtags", "")
    blog.hashtags = [h.strip() for h in hashtags.split(",") if h.strip()]

    # reading time
    content = request.form.get("content")
    blog.reading_time = max(1, len(content) // 200)
    content, toc = generate_toc_and_content(content)

    blog.content = content
    blog.toc = toc

    # image upload
    file = request.files.get("featured_image")
    if file and file.filename:
        blog.featured_image = upload_single_image(file, "blog")

    if not blog.id:
        blog.created_at = datetime.utcnow()

    db.session.add(blog)
    db.session.commit()

    return blog


def get_top_blog():

    # 1️⃣ Featured blog first
    blog = Blog.query.filter_by(
        is_published=True,
    ).order_by(Blog.created_at.desc()).first()

    # 2️⃣ Fallback → most viewed
    if not blog:
        blog = Blog.query.filter_by(
            is_published=True
        ).order_by(Blog.total_views.desc()).first()

    # 3️⃣ Fallback → latest
    if not blog:
        blog = Blog.query.filter_by(
            is_published=True
        ).order_by(Blog.created_at.desc()).first()

    return blog


def generate_toc_and_content(html):
    soup = BeautifulSoup(html, "html.parser")
    toc = []

    for tag in soup.find_all(["h2", "h3"]):
        text = tag.get_text().strip()

        # generate SEO-friendly id
        slug = re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

        # ensure unique ids
        counter = 1
        original_slug = slug
        while soup.find(id=slug):
            slug = f"{original_slug}-{counter}"
            counter += 1

        tag['id'] = slug

        toc.append({
            "id": slug,
            "text": text,
            "level": tag.name  # h2 / h3
        })

    return str(soup), toc
