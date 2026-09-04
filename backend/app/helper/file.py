import os
import uuid
from werkzeug.utils import secure_filename
from flask import current_app
from app.exceptions.file_error import FileNotFoundException, InvalidFileTypeException
from PIL import Image


def has_uploaded_images(request, field_name="image"):
    files = request.files.getlist(field_name)
    return any(
        f and f.filename and f.filename.strip()
        for f in files
    )


def allowed_image(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in current_app.config["ALLOWED_IMAGE_EXTENSIONS"]


def upload_single_image(file, folder):
    """
    Upload a single image file.

    :param file: Werkzeug FileStorage
    :param folder: relative folder inside UPLOAD_FOLDER
                   e.g. 'categories', 'businesses/gold-gym'
    :return: relative file path to store in DB
    """

    if not file:
        raise FileNotFoundException("No file uploaded")

    if not allowed_image(file.filename):
        raise InvalidFileTypeException("Invalid image format")

    img = Image.open(file)
    img = img.convert("RGB")
    img.thumbnail(
        (
            current_app.config["MAX_IMAGE_WIDTH"],
            current_app.config["MAX_IMAGE_HEIGHT"]
        )
    )
    filename = secure_filename(file.filename)
    ext = filename.rsplit(".", 1)[1].lower()

    # prevent overwrite
    unique_name = f"{uuid.uuid4().hex}.{ext}"

    relative_path = f"{folder}/{unique_name}"
    full_path = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        relative_path
    )

    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    img.save(
        full_path,
        format=img.format,
        quality=current_app.config["IMAGE_OUTPUT_QUALITY"],
        method=6
    )

    return relative_path


def upload_multiple_images(files, folder):
    """
    Upload multiple images.

    :param files: list of FileStorage
    :param folder: relative upload folder
    :return: list of relative paths
    """

    uploaded_paths = []

    for file in files:
        try:
            path = upload_single_image(file, folder)
            uploaded_paths.append(path)
        except InvalidFileTypeException:
            continue

    return uploaded_paths


def delete_uploaded_file(relative_path):
    """
    Delete a file safely from UPLOAD_FOLDER.
    relative_path example: 'businesses/gold-gym/image.jpg'
    """

    if not relative_path:
        return

    full_path = os.path.join(
        current_app.config["UPLOAD_FOLDER"],
        relative_path
    )

    try:
        if os.path.isfile(full_path):
            os.remove(full_path)
    except Exception:
        pass


def upload_celebrity_image(file, slug):
    """
    Upload a celebrity profile photo: compress + convert to WebP,
    saved with an SEO-friendly filename based on the celebrity's slug.
    Overwrites any existing image for that slug (stable, predictable URL).
    :param file: Werkzeug FileStorage
    :param slug: celebrity slug, e.g. 'akshay-kumar'
    :return: relative public path, e.g. '/static/uploads/celebrities/akshay-kumar.webp'
    """
    if not file:
        raise FileNotFoundException("No file uploaded")
    if not allowed_image(file.filename):
        raise InvalidFileTypeException("Invalid image format")

    img = Image.open(file)
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        img = img.convert("RGBA")
    else:
        img = img.convert("RGB")

    max_dim = current_app.config.get("CELEBRITY_IMAGE_MAX_DIMENSION", 800)
    img.thumbnail((max_dim, max_dim), Image.LANCZOS)

    filename = f"{secure_filename(slug)}.webp"
    relative_path = f"celebrities/{filename}"
    full_path = os.path.join(current_app.config["UPLOAD_FOLDER"], relative_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)

    img.save(
        full_path,
        format="WEBP",
        quality=current_app.config.get("CELEBRITY_IMAGE_QUALITY", 80),
        method=6,
    )
    return f"/static/uploads/{relative_path}"
