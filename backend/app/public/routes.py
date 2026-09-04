from flask import Blueprint
from app.public.api import (
    get_listing_by_location_and_category, resolve_seo_slug, get_top_listings, get_business_detail, get_trending_categories,
    get_locations_for_keyword, get_categories_by_location, public_search, get_location_detail, get_blogs, get_blog_detail,
    subscribe, get_lost_found_listings, create_lost_found_listing,
    get_reviews, create_review, mark_review_helpful,
    get_voice_topics, create_voice_topic, upvote_voice_topic, increment_voice_topic_views,
    vote_poll_option, get_voice_topic_comments, create_voice_comment,
    get_forum_questions, create_forum_question, mark_forum_answer_helpful, create_forum_answer,
)
from app.public.celebrity_api import get_celebrities, get_celebrity_by_slug, get_celebrity_categories

public_bp = Blueprint("public", __name__, url_prefix="/api/public")

public_bp.add_url_rule(
    "listing/<location_slug>/<category_slug>",
    view_func=get_listing_by_location_and_category,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/resolve-seo-slug/<slug>",
    view_func=resolve_seo_slug,
    methods=["GET"]
)


public_bp.add_url_rule(
    "/top-listings",
    view_func=get_top_listings,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/business/<location_slug>/<category_slug>/<business_slug>",
    view_func=get_business_detail,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/categories/trending",
    view_func=get_trending_categories,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/locations-for-keyword/<keyword>",
    view_func=get_locations_for_keyword,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/categories-by-location/<location_slug>",
    view_func=get_categories_by_location,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/location/<location_slug>",
    view_func=get_location_detail,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/search",
    view_func=public_search,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/blogs",
    view_func=get_blogs,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/blog/<slug>",
    view_func=get_blog_detail,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/subscribe",
    view_func=subscribe,
    methods=["POST"]
)

# Lost & Found endpoints
public_bp.add_url_rule(
    "/lost-found",
    view_func=get_lost_found_listings,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/lost-found",
    view_func=create_lost_found_listing,
    methods=["POST"]
)

# Celebrity endpoints
public_bp.add_url_rule(
    "/celebrities",
    view_func=get_celebrities,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/celebrities/categories",
    view_func=get_celebrity_categories,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/celebrities/<slug>",
    view_func=get_celebrity_by_slug,
    methods=["GET"]
)

# Review endpoints
public_bp.add_url_rule(
    "/reviews",
    view_func=get_reviews,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/reviews",
    view_func=create_review,
    methods=["POST"]
)

public_bp.add_url_rule(
    "/reviews/<int:review_id>/helpful",
    view_func=mark_review_helpful,
    methods=["POST"]
)

# Voice Topic endpoints
public_bp.add_url_rule(
    "/voice",
    view_func=get_voice_topics,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/voice",
    view_func=create_voice_topic,
    methods=["POST"]
)

public_bp.add_url_rule(
    "/voice/<int:topic_id>/upvote",
    view_func=upvote_voice_topic,
    methods=["POST"]
)

public_bp.add_url_rule(
    "/voice/<int:topic_id>/views",
    view_func=increment_voice_topic_views,
    methods=["POST"]
)

public_bp.add_url_rule(
    "/voice/<int:topic_id>/comments",
    view_func=get_voice_topic_comments,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/voice/<int:topic_id>/comments",
    view_func=create_voice_comment,
    methods=["POST"]
)

public_bp.add_url_rule(
    "/voice/poll/<int:option_id>/vote",
    view_func=vote_poll_option,
    methods=["POST"]
)

# Forum endpoints
public_bp.add_url_rule(
    "/forum",
    view_func=get_forum_questions,
    methods=["GET"]
)

public_bp.add_url_rule(
    "/forum",
    view_func=create_forum_question,
    methods=["POST"]
)

public_bp.add_url_rule(
    "/forum/<int:question_id>/answers",
    view_func=create_forum_answer,
    methods=["POST"]
)

public_bp.add_url_rule(
    "/forum/<int:question_id>/answers/<int:answer_id>/helpful",
    view_func=mark_forum_answer_helpful,
    methods=["POST"]
)
