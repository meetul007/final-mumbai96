import re
import math


def calculate_reading_time(html_content):
    text = re.sub('<[^<]+?>', '', html_content)
    words = text.split()
    return max(1, math.ceil(len(words) / 200))
