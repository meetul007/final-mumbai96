import os
import json
import re
from bs4 import BeautifulSoup

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_ROOT = os.path.join(PROJECT_ROOT, "src", "data", "location", "75 locations pages")
JSON_OUTPUT_FOLDER = os.path.join(PROJECT_ROOT, "src", "data", "live-location")


# ============================================================
# SLUG → GROUP MAPPING (aapke page.jsx ke GROUP_POSITIONS se)
# ============================================================
# SLUG_TO_GROUP = {
#     # ---------- restaurants ----------
#     "street-food": "restaurants",
#     "biryani-restaurants": "restaurants",
#     "chinese-restaurants": "restaurants",
#     "south-indian-restaurants": "restaurants",
#     "cafes-coffee-shops": "restaurants",
#     "bakeries": "restaurants",
#     "sweet-shops": "restaurants",
#     "ice-cream-shops": "restaurants",
#     "juice-shops": "restaurants",
#     "seafood-restaurants": "restaurants",
#     "vegetarian-restaurants": "restaurants",
#     "fast-food-restaurants": "restaurants",
#     "restaurants": "restaurants",
#     "east-indian-restaurants": "restaurants",
#     "beach-shacks": "restaurants",
#     "fish-markets": "restaurants",

#     # ---------- real_estate ----------
#     "real-estate-agents": "real_estate",
#     "flats-for-rent": "real_estate",
#     "flats-for-sale": "real_estate",
#     "paying-guest-accommodation": "real_estate",
#     "office-space-for-rent": "real_estate",
#     "property-management": "real_estate",
#     "real-estate": "real_estate",
#     "houses-for-rent": "real_estate",
#     "plots-for-sale": "real_estate",
#     "villas-for-rent": "real_estate",
#     "homestays": "real_estate",
#     "guest-houses": "real_estate",

#     # ---------- hospitals ----------
#     "pharmacies": "hospitals",
#     "eye-doctors": "hospitals",
#     "physiotherapists": "hospitals",
#     "ayurvedic-doctors": "hospitals",
#     "homeopathy-doctors": "hospitals",
#     "blood-banks": "hospitals",
#     "diagnostic-centres": "hospitals",
#     "clinics": "hospitals",
#     "general-physicians": "hospitals",
#     "maternity-clinics": "hospitals",
#     "veterinary-doctors": "hospitals",
#     "ambulance-services": "hospitals",

#     # ---------- cClinics ----------
#     "dental-clinics": "cClinics",
#     "deaddiction-centres": "cClinics",

#     # ---------- shopping ----------
#     "clothing-stores": "shopping",
#     "jewellery-shops": "shopping",
#     "mobile-phone-shops": "shopping",
#     "electronics-stores": "shopping",
#     "optical-shops": "shopping",
#     "grocery-stores": "shopping",
#     "shoe-stores": "shopping",
#     "sports-goods-stores": "shopping",
#     "book-stores": "shopping",
#     "stationery-stores": "shopping",
#     "baby-products-stores": "shopping",
#     "hardware-stores": "shopping",
#     "gift-shops": "shopping",
#     "cake-shops": "shopping",
#     "toy-stores": "shopping",
#     "artifact-shops": "shopping",
#     "fishing-supplies": "shopping",

#     # ---------- home_services ----------
#     "pest-control": "home_services",
#     "home-cleaning-services": "home_services",
#     "painting-services": "home_services",
#     "laundry-dry-cleaners": "home_services",
#     "water-purifier-services": "home_services",
#     "cctv-installation": "home_services",
#     "false-ceiling-contractors": "home_services",
#     "sofa-repair-services": "home_services",
#     "water-supply-services": "home_services",
#     "borewell-services": "home_services",
#     "solar-installers": "home_services",
#     "water-tanker-services": "home_services",
#     "gardeners-landscaping": "home_services",

#     # ---------- electronics_repair ----------
#     "ac-service-and-repair-experts": "electronics_repair",
#     "mobile-phone-repair-experts": "electronics_repair",
#     "laptop-repair-service-experts": "electronics_repair",
#     "appliance-repair": "electronics_repair",

#     # ---------- religion_community ----------
#     "astrologers": "religion_community",
#     "vastu-consultants": "religion_community",
#     "temples": "religion_community",
#     "churches": "religion_community",
#     "gurudwaras": "religion_community",
#     "jain-derasars": "religion_community",
#     "mosques": "religion_community",
#     "heritage-walks": "religion_community",
#     "community-halls": "religion_community",
#     "dabbawalas": "religion_community",
#     "yoga-meditation-centres": "religion_community",
#     "banquet-grounds": "religion_community",
#     "spiritual-gurus": "religion_community",
#     "chapels-crosses": "religion_community",
#     "self-help-groups": "religion_community",
#     "fishing-cooperatives": "religion_community",
#     "fishing-community": "religion_community",
#     "archaeology-sites": "religion_community",
#     "fort-tours": "religion_community",
#     "pilgrimage-tours": "religion_community",
#     "lake-tours": "religion_community",
#     "creek-tours": "religion_community",
#     "beach-tours": "religion_community",
#     "nature-trails": "religion_community",

#     # ---------- doctors ----------
#     "dentists": "doctors",
#     "skin-doctors": "doctors",
#     "ent-doctors": "doctors",
#     "spine-doctors": "doctors",
#     "ortho-doctors": "doctors",
#     "heart-doctors": "doctors",
#     "gynecologist-obstetricians": "doctors",
#     "pediatrician-child-doctors": "doctors",
#     "maternity-hospitals": "doctors",
#     "ivf-centers": "doctors",
#     "hospitals": "doctors",
#     "medical-pathology-labs": "doctors",
#     "psychologists": "doctors",
#     "psychiatrists": "doctors",
#     "xray-sonography-centres": "doctors",

#     # ---------- automotive ----------
#     "second-hand-cars": "automotive",
#     "auto-parts-stores": "automotive",
#     "petrol-pumps": "automotive",
#     "ev-charging-stations": "automotive",
#     "photographers": "automotive",
#     "videographers": "automotive",
#     "photo-studios": "automotive",
#     "printing-shops": "automotive",
#     "car-dealers": "automotive",
#     "bike-dealers": "automotive",
#     "car-wash-services": "automotive",
#     "car-repair-shops": "automotive",
#     "bike-repair-shops": "automotive",
#     "boat-repair": "automotive",
#     "boat-rides": "automotive",
#     "cars-on-rent": "automotive",
#     "auto-rickshaw-services": "automotive",

#     # ---------- entertainment ----------
#     "movie-theatres": "entertainment",
#     "bowling-alleys": "entertainment",
#     "gaming-zones": "entertainment",
#     "escape-rooms": "entertainment",
#     "stand-up-comedy-shows": "entertainment",
#     "creches-daycare": "entertainment",
#     "playschools": "entertainment",
#     "schools": "entertainment",
#     "colleges": "entertainment",
#     "gardens-parks": "entertainment",
#     "trekking-groups": "entertainment",
#     "water-sports": "entertainment",
#     "tour-guides": "entertainment",
#     "film-shoot-locations": "entertainment",
#     "pre-wedding-shoots": "entertainment",

#     # ---------- coaching ----------
#     "spoken-english-classes": "coaching",
#     "computer-classes": "coaching",
#     "swimming-classes": "coaching",
#     "courier-services": "coaching",
#     "co-working-spaces": "coaching",
#     "event-photographers": "coaching",
#     "digital-marketing-agencies": "coaching",
#     "web-designers": "coaching",
#     "tuition-classes": "coaching",
#     "science-classes": "coaching",
#     "maths-tutorials": "coaching",
#     "physics-tutorials": "coaching",
#     "chemistry-tutorials": "coaching",
#     "ielts-classes": "coaching",
#     "jee-classes": "coaching",
#     "mht-cet-classes": "coaching",
#     "gmat-classes": "coaching",
#     "gre-classes": "coaching",
#     "neet-tutorials": "coaching",
#     "art-classes": "coaching",
#     "cooking-classes": "coaching",

#     # ---------- spa_beauty ----------
#     "spas": "spa_beauty",
#     "salons": "spa_beauty",
#     "beauty-parlours": "spa_beauty",
#     "makeover-artists": "spa_beauty",
#     "tattoo-artists": "spa_beauty",
#     "gyms": "spa_beauty",
#     "personal-trainers": "spa_beauty",
#     "dietitians-nutritionists": "spa_beauty",
#     "bridal-makeup-artists": "spa_beauty",
#     "groom-makeup-artists": "spa_beauty",
#     "dance-classes": "spa_beauty",
#     "zumba-classes": "spa_beauty",
#     "yoga-classes": "spa_beauty",
#     "music-classes": "spa_beauty",
#     "drawing-classes": "spa_beauty",
#     "wedding-planners": "spa_beauty",
#     "destination-wedding-planners": "spa_beauty",
#     "birthday-event-planners": "spa_beauty",
#     "anniversary-event-planners": "spa_beauty",
#     "baby-shower-planners": "spa_beauty",
#     "caterers": "spa_beauty",
#     "seafood-caterers": "spa_beauty",
#     "banquet-halls": "spa_beauty",
#     "banquet-lawns": "spa_beauty",
#     "beach-wedding-venues": "spa_beauty",
#     "costumes-on-rent": "spa_beauty",
#     "tent-decorators": "spa_beauty",
#     "live-bands-djs": "spa_beauty",
#     "sound-light-services": "spa_beauty",
#     "florists": "spa_beauty",

#     # ---------- care_community ----------
#     "pet-food-shops": "care_community",
#     "pet-doctors": "care_community",
#     "elders-care": "care_community",
#     "women-care-centres": "care_community",
#     "relationship-counsellor": "care_community",
#     "ngos": "care_community",
#     "ambulance-services": "care_community",
#     "animal-shelters": "care_community",
#     "security-services": "care_community",
#     "police-stations": "care_community",
#     "lifeguard-services": "care_community",

#     # ---------- repairs_tutoring ----------
#     "carpenters": "repairs_tutoring",
#     "plumbers": "repairs_tutoring",
#     "electricians": "repairs_tutoring",
#     "girls-hostel-pg": "repairs_tutoring",
#     "boys-hostel-pg": "repairs_tutoring",
#     "tiffin-services": "repairs_tutoring",
#     "driving-schools": "repairs_tutoring",
#     "packers-and-movers": "repairs_tutoring",
#     "masons-contractors": "repairs_tutoring",
#     "welders-fabricators": "repairs_tutoring",
#     "tailors": "repairs_tutoring",
#     "scrap-dealers": "repairs_tutoring",
#     "building-contractors": "repairs_tutoring",

#     # ---------- finance_insurance ----------
#     "stock-brokers": "finance_insurance",
#     "financial-advisors": "finance_insurance",
#     "chartered-accountants-ca": "finance_insurance",
#     "income-tax-consultants": "finance_insurance",
#     "lawyers-and-advocates": "finance_insurance",
#     "property-lawyers": "finance_insurance",
#     "personal-loan-providers": "finance_insurance",
#     "gold-loan-providers": "finance_insurance",
#     "home-loan-providers": "finance_insurance",
#     "auto-loan-providers": "finance_insurance",
#     "business-loan-providers": "finance_insurance",
#     "loan-against-property": "finance_insurance",
#     "health-insurance-providers": "finance_insurance",
#     "term-life-insurance-providers": "finance_insurance",
#     "car-insurance-providers": "finance_insurance",
#     "bike-insurance-providers": "finance_insurance",
#     "boat-insurance": "finance_insurance",
#     "travel-agents": "finance_insurance",
#     "visa-consultants": "finance_insurance",
#     "passport-agents": "finance_insurance",
#     "honeymoon-travel-agents": "finance_insurance",
#     "medical-tourism": "finance_insurance",
#     "architects": "finance_insurance",
#     "interior-designers": "finance_insurance",
#     "furniture-and-decor-stores": "finance_insurance",
#     "light-decor-shops": "finance_insurance",
#     "furniture-on-rent": "finance_insurance",
#     "detective-agencies-spy-agents": "finance_insurance",


#     # ============ MISSING SLUGS (NEW) ============
#     # Restaurants
#     "bars-and-lounges": "restaurants",
#     "maharashtrian-restaurants": "restaurants",
#     "misal-pav-joints": "restaurants",
#     "patisseries-desserts": "restaurants",
#     "udipi-restaurants": "restaurants",
#     "gujarati-thali-restaurants": "restaurants",
#     "jain-restaurants": "restaurants",
#     "farsan-namkeen-shops": "restaurants",
#     "sweet-farsan-shops": "restaurants",
#     "food-walks": "restaurants",
    
#     # Entertainment
#     "art-galleries": "entertainment",
#     "art-culture-spaces": "entertainment",
#     "beach-resorts": "entertainment",
#     "beach-clubs": "entertainment",
#     "bollywood-studios": "entertainment",
#     "film-studios": "entertainment",
#     "film-city-tours": "entertainment",
#     "budget-hotels": "entertainment",
#     "business-hotels": "entertainment",
#     "business-centres": "entertainment",
#     "business-schools": "entertainment",
#     "cultural-halls": "entertainment",
#     "cultural-sabhas": "entertainment",
#     "libraries": "entertainment",
#     "public-gardens": "entertainment",
#     "recording-studios": "entertainment",
#     "gymkhanas-clubs": "entertainment",
#     "celebrity-home-tours": "entertainment",
#     "street-art-tours": "entertainment",
#     "tribal-community-tours": "entertainment",
#     "marathi-theatres": "entertainment",
#     "buddhist-viharas": "entertainment",
#     "dhobi-ghat-tours": "entertainment",
#     "racecourse-events": "entertainment",
#     "adventure-sports": "entertainment",
#     "boat-rentals": "entertainment",
#     "ferry-boat-rides": "entertainment",
    
#     # Shopping
#     "saree-shops": "shopping",
#     "boutiques-designer-stores": "shopping",
#     "luxury-car-dealers": "shopping",
#     "gourmet-stores": "shopping",
#     "curtain-blinds-shops": "shopping",
#     "flooring-shops": "shopping",
#     "furniture-shops": "shopping",
#     "home-decor-shops": "shopping",
#     "art-and-decor-suppliers": "shopping",
#     "bag-repair": "shopping",
#     "flower-market": "shopping",
#     "fish-market": "shopping",
#     "atms": "shopping",
#     "banks": "shopping",
    
#     # Home services
#     "ac-repair-services": "home_services",
#     "ac-service-and-repair": "home_services",
#     "ac-repair": "home_services",
#     "cctv-and-security-systems": "home_services",
#     "home-tutors": "home_services",
#     "community-centers": "home_services",
    
#     # Finance
#     "ca-chartered-accountants": "finance_insurance",
#     "ca-coaching-classes": "finance_insurance",
#     "company-registration": "finance_insurance",
#     "gst-consultants": "finance_insurance",
#     "health-insurance": "finance_insurance",
#     "audit-firms": "finance_insurance",
    
#     # Coaching
#     "coaching-classes": "coaching",
#     "english-tutors": "coaching",
#     "university-coaching": "coaching",
#     "music-academies": "coaching",
#     "carnatic-music-classes": "coaching",
    
#     # Care community
#     "dog-trainers": "care_community",
#     "pet-grooming": "care_community",
#     "fire-stations": "care_community",
#     "fire-emergency": "care_community",
#     "emergency-services": "care_community",
#     "detective-agencies": "care_community",
    
#     # Spa beauty
#     "pilates-studios": "spa_beauty",
#     "cosmetologists": "spa_beauty",
#     "luxury-salons": "spa_beauty",
#     "acting-classes": "spa_beauty",
    
#     # Religion community
#     "jain-temples": "religion_community",
#     "agiaries-fire-temples": "religion_community",
#     "dargahs": "religion_community",
    
#     # Automotive
#     "car-rentals-chauffeur": "automotive",
#     "bike-taxi-services": "automotive",
#     "car-service-centres": "automotive",
    
#     # Other
#     "av-equipment-rentals": "spa_beauty",
#     "award-night-planners": "spa_beauty",
#     "branding-agencies": "coaching",

#         # ============ MORE MISSING SLUGS ============
#     # Restaurants
#     "corporate-caterers": "restaurants",
    
#     # Real estate
#     "commercial-real-estate-agents": "real_estate",
#     "hostels": "real_estate",
#     "hotels": "real_estate",
#     "hotels-resorts": "real_estate",
    
#     # Hospitals / doctors
#     "insurance-agents": "hospitals",
#     "life-insurance": "hospitals",
#     "police-helpline": "hospitals",
    
#     # Shopping
#     "lighting-shops": "shopping",
#     "modular-kitchen": "shopping",
#     "meat-market": "shopping",
#     "pet-shops": "shopping",
#     "corporate-gift-shops": "shopping",
#     "corporate-gifting": "shopping",
#     "concert-tickets": "shopping",
    
#     # Home services
#     "furniture-repair": "home_services",
#     "microwave-repair": "home_services",
#     "printer-repair": "home_services",
    
#     # Electronics repair
#     "laptop-repair-shops": "electronics_repair",
#     "mobile-repair-shops": "electronics_repair",
#     "laptop-repair": "electronics_repair",
#     "mobile-repair": "electronics_repair",
    
#     # Religion community
#     "meditation-centres": "religion_community",
#     "ngo-social-welfare": "religion_community",
    
#     # Doctors
#     "commercial-architects": "doctors",
#     "compliance-consultants": "doctors",
    
#     # Automotive
#     "jet-ski-rentals": "automotive",
#     "parasailing": "automotive",
    
#     # Coaching
#     "ias-coaching-classes": "coaching",
#     "jee-coaching-classes": "coaching",
#     "neet-coaching-classes": "coaching",
#     "maths-tutors": "coaching",
#     "jee-coaching": "coaching",
#     "cfa-frm-classes": "coaching",
#     "corporate-language-training": "coaching",
    
#     # Care community
#     "concierge-services": "care_community",
    
#     # Finance
#     "lawyers-advocates": "finance_insurance",
#     "legal-aid-services": "finance_insurance",
#     "mutual-funds": "finance_insurance",
#     "loan-consultants": "finance_insurance",
#     "corporate-insurance": "finance_insurance",
    
#     # Spa beauty
#     "conference-planners": "spa_beauty",
#     "corporate-event-planners": "spa_beauty",
#     "conference-venues": "spa_beauty",
#     "consulate-services": "spa_beauty",

#         # ============ FINAL FIX ============
#     # BKC (Corporate services)
#     "corporate-lawyers": "finance_insurance",
#     "corporate-photographers": "automotive",
#     "corporate-tie-ups": "finance_insurance",
#     "corporate-tiffin-services": "restaurants",
#     "corporate-training": "coaching",
#     "corporate-travel-agents": "finance_insurance",
#     "corporate-wellness": "spa_beauty",
#     "corporate-wellness-programs": "spa_beauty",
#     "counselling-services": "care_community",
#     "csr-and-ngos": "care_community",
#     "data-entry-services": "coaching",
#     "data-science-courses": "coaching",
#     "diagnostic-imaging": "hospitals",
#     "driving-services": "automotive",
#     "elder-care-services": "care_community",
    
#     # Colaba / Fort / Cuffe Parade / Gorai
#     "ngos-social-organisations": "care_community",
#     "old-age-homes": "care_community",
#     "packers-movers": "repairs_tutoring",
#     "refrigerator-repair": "electronics_repair",
#     "sanitary-ware-shops": "home_services",
#     "science-tutors": "coaching",
#     "service-apartments": "real_estate",
#     "shoe-repair-shops": "repairs_tutoring",
#     "slum-tours": "entertainment",
#     "storage-facilities": "home_services",
#     "tailors-alteration-shops": "repairs_tutoring",
#     "tax-consultants": "finance_insurance",
#     "tiles-shops": "home_services",
#     "tv-repair-services": "electronics_repair",
#     "vehicle-insurance": "finance_insurance",
#     "veterinary-clinics": "care_community",
    
#     # Madh-Marve-Island (beach/coastal specialities)
#     "scuba-diving": "entertainment",
#     "shoe-repair": "repairs_tutoring",
#     "spice-market": "shopping",
#     "sunset-tours": "entertainment",
#     "tv-repair": "electronics_repair",
#     "vegetable-market": "shopping",
#     "washing-machine-repair": "electronics_repair",
#     "watch-repair": "repairs_tutoring",
#     "windsurfing": "entertainment",
#     "women-safety-helpline": "care_community",


#         # ============ BKC FINAL ============
#     "event-management": "spa_beauty",
#     "executive-coaching": "coaching",
#     "exhibition-organisers": "spa_beauty",
#     "eye-hospitals": "hospitals",
#     "facility-management": "home_services",
#     "finance-certifications": "coaching",
#     "fine-dining-restaurants": "restaurants",
#     "food-trucks": "restaurants",
#     "forex-services": "finance_insurance",
#     "grooming-studios": "spa_beauty",
#     "health-checkup-centres": "hospitals",
#     "hr-recruitment-firms": "finance_insurance",
#     "insurance-brokers": "finance_insurance",
#     "interior-fit-out-contractors": "home_services",
#     "investment-advisors": "finance_insurance",

#         # ============ BKC ABSOLUTE FINAL ============
#     "it-amc-services": "home_services",
#     "it-support": "home_services",
#     "language-classes": "coaching",
#     "laptop-repair-services": "electronics_repair",
#     "life-insurance-providers": "finance_insurance",
#     "logistics-providers": "finance_insurance",
#     "luxury-brands": "shopping",
#     "luxury-car-rentals": "automotive",
#     "management-consultants": "finance_insurance",
#     "meeting-rooms": "real_estate",
#     "mobile-phone-repair": "electronics_repair",
#     "notary-services": "finance_insurance",
#     "office-carpenters": "home_services",
#     "office-cleaning-services": "home_services",
#     "office-furniture": "finance_insurance",

#         # ============ BKC FINAL 26 ============
#     "office-furniture-suppliers": "shopping",
#     "office-interior-designers": "finance_insurance",
#     "office-lighting-suppliers": "shopping",
#     "office-movers": "repairs_tutoring",
#     "passport-services": "finance_insurance",
#     "pet-care-services": "care_community",
#     "plumbing-services": "home_services",
#     "printer-amc": "electronics_repair",
#     "printing-and-signage": "shopping",
#     "private-banking": "finance_insurance",
#     "product-launch-venues": "spa_beauty",
#     "public-speaking-training": "coaching",
#     "quick-service-restaurants": "restaurants",
#     "relocation-services": "repairs_tutoring",
#     "serviced-apartments": "real_estate",

#         # ============ BKC LAST BATCH ============
#     "soft-skills-training": "coaching",
#     "stationery-suppliers": "shopping",
#     "supermarkets": "shopping",
#     "tax-advisory": "finance_insurance",
#     "trademark-ip-lawyers": "finance_insurance",
#     "translation-services": "coaching",
#     "valet-and-parking": "automotive",
#     "venture-capital-firms": "finance_insurance",
#     "visa-immigration-consultants": "finance_insurance",
#     "water-suppliers": "home_services",
#     "wealth-management": "finance_insurance",
#     "wellness-centres": "spa_beauty",
#     # ---------- fallback / anything else ----------
# }

# Group labels & icons (aapke reference JSON se)
GROUP_META = {
    "restaurants": {"label": "Restaurants", "icon": "🍽️"},
    "real_estate": {"label": "Real Estate", "icon": "🏠"},
    "hospitals": {"label": "Hospitals", "icon": "🏥"},
    "cClinics": {"label": "Clinics", "icon": "🏥"},
    "shopping": {"label": "Shopping", "icon": "🛍️"},
    "home_services": {"label": "Home Services", "icon": "🔧"},
    "electronics_repair": {"label": "Electronics Repair", "icon": "🔌"},
    "religion_community": {"label": "Religion & Community", "icon": "🕉️"},
    "doctors": {"label": "Doctors", "icon": "👨‍⚕️"},
    "automotive": {"label": "Automotive", "icon": "🚗"},
    "entertainment": {"label": "Entertainment", "icon": "🎬"},
    "coaching": {"label": "Coaching & Tutoring", "icon": "📚"},
    "spa_beauty": {"label": "Spa & Beauty", "icon": "💆"},
    "care_community": {"label": "Care, Community & Safety", "icon": "🤝"},
    "repairs_tutoring": {"label": "Repairs, Tutoring & Hospitality", "icon": "🔧"},
    "finance_insurance": {"label": "Finance, Insurance & Home Decor", "icon": "🏦"},
}

# Render order (aapke page.jsx ke GROUP_POSITIONS se)
GROUP_ORDER = [
    "restaurants", "real_estate", "hospitals",
    "cClinics", "shopping", "home_services", "electronics_repair",
    "religion_community", "doctors",
    "automotive", "entertainment", "coaching",
    "spa_beauty",
    "care_community",
    "repairs_tutoring",
    "finance_insurance",
]


def clean_text(text):
    if not text:
        return ""
    return re.sub(r'\s+', ' ', text).strip()


def extract_data_from_html(file_path, html_content):
    soup = BeautifulSoup(html_content, 'lxml')
    file_name = os.path.basename(file_path).replace('.html', '')
    data = {}

    # ============ SEO ============
    data['seo_title'] = clean_text(soup.title.string) if soup.title else ''
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    data['seo_description'] = meta_desc['content'] if meta_desc else ''
    meta_kw = soup.find('meta', attrs={'name': 'keywords'})
    data['seo_keywords'] = meta_kw['content'] if meta_kw else ''
    og_img = soup.find('meta', attrs={'property': 'og:image'})
    data['image'] = og_img['content'] if og_img else ''
    data['location_icon'] = data['image']

    # ============ ABOUT ============
    about = soup.find('section', class_='about')
    if about:
        # Name sirf file_name se banao (short & consistent)
        data['name'] = file_name.replace('-', ' ').title()
        
        # About section ki h2 heading lo
        h2 = about.find('h2')
        data['about_title'] = clean_text(h2.get_text()) if h2 else data['name']

        paragraphs = about.find_all('p')
        about_text = ""
        for p in paragraphs:
            classes = p.get('class') or []
            if 'sl' not in classes and 'sd' not in classes:
                txt = clean_text(p.get_text())
                if txt and 'Commute:' not in txt and 'Tag:' not in txt:
                    about_text += txt + " "
        data['about'] = about_text.strip()

        data['about_commute'] = ''
        data['about_tag'] = ''
        for p in paragraphs:
            txt = p.get_text()
            if 'Commute:' in txt and 'Tag:' in txt:
                m1 = re.search(r'Commute:\s*(.+?)\s*\|', txt)
                m2 = re.search(r'Tag:\s*(.+?)$', txt)
                if m1: data['about_commute'] = clean_text(m1.group(1))
                if m2: data['about_tag'] = clean_text(m2.group(1))
                break

        stats = []
        for stat in about.find_all('div', class_='ahc'):
            strong = stat.find('strong')
            span = stat.find('span')
            stats.append({
                'value': clean_text(strong.get_text()) if strong else '',
                'label': clean_text(span.get_text()) if span else ''
            })
        data['about_stats'] = stats
    else:
        data['name'] = file_name
        data['about_title'] = file_name.replace('-', ' ').title()
        data['about'] = ''
        data['about_commute'] = ''
        data['about_tag'] = ''
        data['about_stats'] = []

    # ============ PLACES ============
    places_section = soup.find('section', id='places')
    places = []
    if places_section:
        for card in places_section.find_all('div', class_='guide-card'):
            tag_el = card.find('div', class_='guide-card-tag')
            name_el = card.find('h3')
            desc_el = card.find('p')
            ph = card.find('div', class_='guide-card-ph')
            places.append({
                'tag': clean_text(tag_el.get_text()) if tag_el else '',
                'name': clean_text(name_el.get_text()) if name_el else '',
                'description': clean_text(desc_el.get_text()) if desc_el else '',
                'icon': clean_text(ph.get_text()) if ph else ''
            })
    data['places_to_visit'] = places

    # ============ FOOD ============
    food_section = soup.find('section', id='food')
    food_items = []
    food_tags = []
    if food_section:
        tags_div = food_section.find('div', class_='food-tags')
        if tags_div:
            food_tags = [clean_text(t.get_text()) for t in tags_div.find_all('span')]
        for item in food_section.find_all('div', class_='list-item'):
            icon_el = item.find('span', class_='li-icon')
            h3 = item.find('h3')
            desc = item.find('p')
            food_items.append({
                'name': clean_text(h3.get_text()) if h3 else '',
                'description': clean_text(desc.get_text()) if desc else '',
                'icon': clean_text(icon_el.get_text()) if icon_el else ''
            })
    data['food_tags'] = ", ".join(food_tags)
    data['food'] = food_items

    # ============ NIGHTLIFE ============
    nl_section = soup.find('section', id='nightlife')
    nightlife = []
    nl_tips = []
    if nl_section:
        for item in nl_section.find_all('div', class_='list-item'):
            icon_el = item.find('span', class_='li-icon')
            heading = item.find('h3') or item.find('h5')
            desc = item.find('p')
            nightlife.append({
                'name': clean_text(heading.get_text()) if heading else '',
                'description': clean_text(desc.get_text()) if desc else '',
                'icon': clean_text(icon_el.get_text()) if icon_el else ''
            })
        tip_box = nl_section.find('div', class_='tip-box')
        if tip_box:
            for li in tip_box.find_all('li'):
                nl_tips.append(clean_text(li.get_text()))
    data['night_life'] = nightlife
    data['night_life_tips'] = nl_tips

    # ============ SUB-AREAS ============
    subarea_section = soup.find('section', id='subareas')
    sub_areas = []
    if subarea_section:
        for card in subarea_section.find_all('div', class_='subarea-card'):
            img = card.find('img')
            tag_el = card.find('div', class_='subarea-tag')
            name_el = card.find('h3')
            desc_el = card.find('p')
            sub_areas.append({
                'tag': clean_text(tag_el.get_text()) if tag_el else '',
                'name': clean_text(name_el.get_text()) if name_el else '',
                'description': clean_text(desc_el.get_text()) if desc_el else '',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['sub_areas'] = sub_areas

    # ============ VIBE ============
    vibe_section = soup.find('section', id='vibe')
    vibe_tags = []
    vibe_desc = ''
    vibe_img = ''
    if vibe_section:
        for span in vibe_section.find_all('span', class_='vibe-tag'):
            vibe_tags.append({'keyword': clean_text(span.get_text())})
        vimg = vibe_section.find('div', class_='vibe-img')
        if vimg and vimg.find('img'):
            vibe_img = vimg.find('img')['src']
        for p in vibe_section.find_all('p'):
            vibe_desc += clean_text(p.get_text()) + " "
    data['character_vibe'] = vibe_tags
    data['character_vibe_description'] = vibe_desc.strip()
    data['character_vibe_image'] = vibe_img

    # ============ RESIDENTS ============
    resident_section = soup.find('section', id='residents')
    residents = []
    resident_img = ''
    resident_desc = ''
    if resident_section:
        for stat in resident_section.find_all('div', class_='profile-stat'):
            residents.append({
                'segment': clean_text(stat.find('strong').get_text()) if stat.find('strong') else '',
                'description': clean_text(stat.find('span').get_text()) if stat.find('span') else ''
            })
        pimg = resident_section.find('div', class_='profile-img')
        if pimg and pimg.find('img'):
            resident_img = pimg.find('img')['src']
        for p in resident_section.find_all('p'):
            resident_desc += clean_text(p.get_text()) + " "
    data['resident_profile'] = residents
    data['resident_profile_image'] = resident_img
    data['resident_profile_description'] = resident_desc.strip()

    # ============ PROPERTY ============
    prop_section = soup.find('section', id='property')
    property_prices = []
    if prop_section:
        for card in prop_section.find_all('div', class_='prop-card'):
            img = card.find('img')
            labels = card.find_all('div', class_='price-lbl')
            price_el = card.find('div', class_='price')
            property_prices.append({
                'sub_area': clean_text(labels[0].get_text()) if len(labels) > 0 else '',
                'price': clean_text(price_el.get_text()) if price_el else '',
                'rental': clean_text(labels[1].get_text()).replace('Rent:', '').strip() if len(labels) > 1 else '',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['property_prices'] = property_prices

    # ============ SCHOOLS ============
    sch_section = soup.find('section', id='schools')
    schools = []
    if sch_section:
        for item in sch_section.find_all('div', class_='school-item'):
            img = item.find('img')
            schools.append({
                'name': clean_text(item.find('h3').get_text()) if item.find('h3') else '',
                'location': clean_text(item.find('span').get_text()) if item.find('span') else '',
                'badge': clean_text(item.find('div', class_='school-badge').get_text()) if item.find('div', class_='school-badge') else '',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['schools'] = schools

    # ============ HOSPITALS ============
    hosp_section = soup.find('section', id='hospitals')
    hospitals = []
    if hosp_section:
        for card in hosp_section.find_all('div', class_='hosp-card'):
            img = card.find('img')
            typ = card.find('div', class_='hosp-type')
            h3 = card.find('h3')
            desc = card.find('p')
            hospitals.append({
                'type': clean_text(typ.get_text()) if typ else '',
                'name': clean_text(h3.get_text()) if h3 else '',
                'description': clean_text(desc.get_text()) if desc else '',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['hospitals'] = hospitals

    # ============ BANKS ============
    bank_section = soup.find('section', id='banks')
    banks = []
    if bank_section:
        for chip in bank_section.find_all('div', class_='bank-chip'):
            img = chip.find('img')
            banks.append({
                'name': clean_text(chip.get_text()),
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['banks'] = banks

    # ============ MARKETS ============
    mkt_section = soup.find('section', id='markets')
    markets = []
    if mkt_section:
        for card in mkt_section.find_all('div', class_='market-card'):
            img = card.find('img')
            h3 = card.find('h3') or card.find('h5')
            desc = card.find('p')
            markets.append({
                'name': clean_text(h3.get_text()) if h3 else '',
                'description': clean_text(desc.get_text()) if desc else '',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['markets'] = markets

    # ============ COMMUTE ============
    commute_section = soup.find('section', id='commute')
    commute_data = []
    commute_detail = []
    commute_desc = ''
    if commute_section:
        sd = commute_section.find('p', class_='sd')
        commute_desc = clean_text(sd.get_text()) if sd else ''
        box = commute_section.find('div', class_='commute-box')
        if box:
            for cb in box.find_all('div', class_='cb2'):
                icon_el = cb.find('div', class_='cb2-icon')
                val_el = cb.find('div', class_='cb2-val')
                lbl_el = cb.find('div', class_='cb2-lbl')
                commute_data.append({
                    'name': clean_text(lbl_el.get_text()) if lbl_el else '',
                    'icon': clean_text(icon_el.get_text()) if icon_el else '',
                    'distance': clean_text(val_el.get_text()) if val_el else '',
                    'tag': ''
                })
        for card in commute_section.find_all('div', class_='commute-card'):
            img = card.find('img')
            h3 = card.find('h3')
            desc = card.find('p')
            commute_detail.append({
                'name': clean_text(h3.get_text()) if h3 else '',
                'description': clean_text(desc.get_text()) if desc else '',
                'icon': '🚗',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['travelling_connectivity'] = commute_data
    data['commute_description'] = commute_desc
    data['commute_detail_items'] = commute_detail

    # ============ EMPLOYERS ============
    emp_section = soup.find('section', id='employers')
    employers = []
    if emp_section:
        for card in emp_section.find_all('div', class_='employer-card'):
            img = card.find('img')
            sector = card.find('span', class_='employer-sector')
            h3 = card.find('h3') or card.find('h5')
            desc = card.find('p')
            employers.append({
                'sector': clean_text(sector.get_text()) if sector else '',
                'name': clean_text(h3.get_text()) if h3 else '',
                'description': clean_text(desc.get_text()) if desc else '',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['major_employers'] = employers

    # ============ SOCIETIES ============
    soc_section = soup.find('section', id='societies')
    societies = []
    if soc_section:
        for item in soc_section.find_all('div', class_='soc-item'):
            img = item.find('img')
            h3 = item.find('h3')
            span = item.find('span')
            societies.append({
                'name': clean_text(h3.get_text()) if h3 else '',
                'description': clean_text(span.get_text()) if span else '',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['residential_societies'] = societies

    # ============ EVENTS ============
    evt_section = soup.find('section', id='events')
    events = []
    if evt_section:
        for card in evt_section.find_all('div', class_='event-card'):
            img = card.find('img')
            month = card.find('div', class_='event-month')
            h3 = card.find('h3')
            desc = card.find('p')
            events.append({
                'name': clean_text(h3.get_text()) if h3 else '',
                'description': clean_text(desc.get_text()) if desc else '',
                'date': clean_text(month.get_text()) if month else '',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['local_events'] = events

    # ============ UPCOMING PROJECTS ============
    dev_section = soup.find('section', id='developments')
    projects = []
    if dev_section:
        for card in dev_section.find_all('div', class_='dev-card'):
            img = card.find('img')
            status_el = card.find('div', class_='dev-status')
            h3 = card.find('h3')
            desc = card.find('p')
            projects.append({
                'name': clean_text(h3.get_text()) if h3 else '',
                'description': clean_text(desc.get_text()) if desc else '',
                'status': clean_text(status_el.get_text()) if status_el else '',
                'image': img['src'] if img and img.has_attr('src') else ''
            })
    data['upcoming_projects'] = projects

    # ============ CIVIC DATA ============
    civic_section = soup.find('section', id='civicdata')
    civic_data = {}
    if civic_section:
        for chip in civic_section.find_all('div', class_='civic-chip'):
            img = chip.find('img')
            lbl = chip.find('div', class_='cv-label')
            val = chip.find('div', class_='cv-val')
            if lbl:
                key = clean_text(lbl.get_text()).lower().replace(' ', '_').replace('.', '').replace('/', '_')
                civic_data[key] = {
                    'label': clean_text(lbl.get_text()),
                    'value': clean_text(val.get_text()) if val else '',
                    'image': img['src'] if img and img.has_attr('src') else ''
                }
    data['civic_data'] = civic_data

    # ============ REPORT CARD ============
    report_section = soup.find('section', id='reportcard')
    report_card = {}
    if report_section:
        for card in report_section.find_all('div', class_='report-card'):
            h3 = card.find('h3') or card.find('h5')
            stars_el = card.find('div', class_='stars')
            star_count = len(stars_el.find_all('span')) if stars_el else 0
            if h3:
                key = clean_text(h3.get_text()).lower()
                key = re.sub(r'[^a-z0-9]+', '_', key).strip('_')
                report_card[key] = star_count
    data['area_report_card'] = report_card

    # ============ LIVING STYLE ============
    local_life = soup.find('section', id='locallife')
    living = []
    if local_life:
        for item in local_life.find_all('div', class_='list-item'):
            img = item.find('img')
            h3 = item.find('h3')
            desc = item.find('p')
            living.append({
                'name': clean_text(h3.get_text()) if h3 else '',
                'description': clean_text(desc.get_text()) if desc else '',
                'image': img['src'] if img and img.has_attr('src') else '',
                'icon': '🏠'
            })
    data['living_style'] = living

    # ============ FAQ ============
    faqs = []
    for script in soup.find_all('script', attrs={'type': 'application/ld+json'}):
        try:
            jdata = json.loads(script.string)
            if isinstance(jdata, dict) and jdata.get('@type') == 'FAQPage':
                for item in jdata.get('mainEntity', []):
                    faqs.append({
                        'question': item.get('name', ''),
                        'answer': item.get('acceptedAnswer', {}).get('text', '')
                    })
                break
        except Exception:
            pass
    data['faq'] = faqs

    # ============ CATEGORIES (10 featured) ============
    # Yeh 10 woh hain jo ServiceSection mein use hote hain (per-category cards)
    featured_slugs = [
        "dentists", "skin-doctors", "gynecologists", "salons", "plumbers",
        "electricians", "gyms", "restaurants", "tiffin-services", "real-estate"
    ]
    featured_categories = []

    # ============ CATEGORY GROUPS ============
    # HTML ke saare cat-grid-sec sections se saare categories collect karo
       # ============ CATEGORY SECTIONS (HTML ke exact 8 sections) ============
    cat_sections = soup.find_all('section', class_='cat-grid-sec')
    category_sections = []
    
    for idx, sec in enumerate(cat_sections, 1):
        # Section heading (h2)
        h2 = sec.find('h2', class_='st')
        heading = clean_text(h2.get_text()) if h2 else f'Section {idx}'
        
        # Section ki saari categories (jo HTML mein hain)
        cats = []
        for a in sec.find_all('a', class_='cat-card'):
            emoji_el = a.find('span', class_='cat-emoji')
            name_el = a.find('span', class_='cat-name')
            href = a.get('href', '')
            slug = href.rstrip('/').split('/')[-1] if href else ''
            if slug:
                cats.append({
                    'slug': slug,
                    'name': clean_text(name_el.get_text()) if name_el else '',
                    'emoji': clean_text(emoji_el.get_text()) if emoji_el else ''
                })
        
        category_sections.append({
            'key': f'section_{idx}',
            'heading': heading,
            'categories': cats
        })
    
    data['category_sections'] = category_sections
    
    # ============ CATEGORIES (10 featured for ServiceSection) ============
    featured_slugs = [
        "dentists", "skin-doctors", "gynecologists", "salons", "plumbers",
        "electricians", "gyms", "restaurants", "tiffin-services", "real-estate"
    ]
    featured_categories = []
    
    # Saari cat-grid-sec se categories collect karo (slug → {name, emoji})
    all_cats_lookup = {}
    for sec in cat_sections:
        for a in sec.find_all('a', class_='cat-card'):
            emoji_el = a.find('span', class_='cat-emoji')
            name_el = a.find('span', class_='cat-name')
            href = a.get('href', '')
            slug = href.rstrip('/').split('/')[-1] if href else ''
            if slug and slug not in all_cats_lookup:
                all_cats_lookup[slug] = {
                    'slug': slug,
                    'name': clean_text(name_el.get_text()) if name_el else '',
                    'emoji': clean_text(emoji_el.get_text()) if emoji_el else ''
                }
    
    # Service sections (cs) se image + description nikaalo
    for sec in soup.find_all('section', class_='cs'):
        # Image
        img_el = sec.find('img')
        # Slug from "View All" link
        link_el = sec.find('a', class_='cl')
        slug = ''
        if link_el:
            href = link_el.get('href', '')
            slug = href.rstrip('/').split('/')[-1] if href else ''
        # Name
        h3 = sec.find('h3')
        # Description
        cb = sec.find('div', class_='cb')
        desc = ''
        if cb:
            ps = cb.find_all('p')
            if ps:
                desc = clean_text(ps[0].get_text())
        # Emoji
        emoji = ''
        ci = sec.find('div', class_='ci')
        if ci:
            for sp in ci.find_all('span'):
                if sp.get('class') == ['it']:
                    continue
                txt = clean_text(sp.get_text())
                if txt and len(txt) < 5:
                    emoji = txt
                    break
        
        if slug:
            if slug not in all_cats_lookup:
                all_cats_lookup[slug] = {'slug': slug, 'name': '', 'emoji': ''}
            if h3:
                all_cats_lookup[slug]['name'] = all_cats_lookup[slug]['name'] or clean_text(h3.get_text())
            all_cats_lookup[slug]['image'] = img_el['src'] if img_el and img_el.has_attr('src') else ''
            all_cats_lookup[slug]['description'] = desc
            if emoji:
                all_cats_lookup[slug]['emoji'] = all_cats_lookup[slug]['emoji'] or emoji
    
    # Build featured categories array (10 items)
    for slug in featured_slugs:
        if slug in all_cats_lookup:
            cat = all_cats_lookup[slug]
            featured_categories.append({
                'slug': cat['slug'],
                'name': cat['name'],
                'emoji': cat['emoji'],
                'image': cat.get('image', ''),
                'description': cat.get('description', '')
            })
    data['categories'] = featured_categories
    
    # ============ BEST SERVICES ============
    # ============ BEST SERVICES ============
    prose = soup.find('section', class_='prose')
    best_services = []
    if prose:
        h2 = prose.find('h2')
        first_p = prose.find('p')
        if h2:
            best_services.append({
                'name': clean_text(h2.get_text()),
                'description': clean_text(first_p.get_text()) if first_p else ''
            })
        for h3 in prose.find_all('h3'):
            nxt = h3.find_next_sibling('p')
            best_services.append({
                'name': clean_text(h3.get_text()),
                'description': clean_text(nxt.get_text()) if nxt else ''
            })
    data['best_services'] = best_services

    # ============ NEARBY ============
    nearby = soup.find('section', class_='nearby')
    nearby_locs = []
    if nearby:
        for a in nearby.find_all('a', class_='nc'):
            href = a.get('href', '').lstrip('/')
            nearby_locs.append({
                'slug': href,
                'name': clean_text(a.get_text()).replace('📍', '').strip()
            })
    data['nearby_locations'] = nearby_locs

    # ============ TOP-LEVEL POPULATION / MUNICIPAL BODY ============
    # page.jsx ye top-level expect karta hai
    if 'population' not in data or not data.get('population'):
        # about_stats se try karo
        for s in data.get('about_stats', []):
            if 'popul' in s.get('label', '').lower():
                data['population'] = s.get('value', '')
                break
    data.setdefault('population', '')
    if not data.get('municipal_body'):
        for s in data.get('about_stats', []):
            if 'municipal' in s.get('label', '').lower():
                data['municipal_body'] = s.get('value', '')
                break
    data.setdefault('municipal_body', '')

    return data


def main():
    if not os.path.isdir(HTML_ROOT):
        print(f"❌ HTML folder nahi mila: {HTML_ROOT}")
        return

    os.makedirs(JSON_OUTPUT_FOLDER, exist_ok=True)

    html_files = []
    for root, dirs, files in os.walk(HTML_ROOT):
        for f in files:
            if f.startswith('._') or f.startswith('.'):
                continue
            if f.endswith('.html'):
                html_files.append(os.path.join(root, f))

    total = len(html_files)
    print(f"\n📁 HTML source: {HTML_ROOT}")
    print(f"📂 JSON output: {JSON_OUTPUT_FOLDER}")
    print(f"📄 Total {total} HTML files mili.\n")

    skipped_slugs = set()

    for i, html_path in enumerate(html_files, 1):
        try:
            with open(html_path, 'r', encoding='utf-8') as f:
                content = f.read()

            data = extract_data_from_html(html_path, content)

            json_name = os.path.basename(html_path).replace('.html', '.json')
            json_path = os.path.join(JSON_OUTPUT_FOLDER, json_name)

            with open(json_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)

            print(f"[{i}/{total}] ✅ {json_name}")
        except Exception as e:
            print(f"[{i}/{total}] ❌ {os.path.basename(html_path)} - {e}")

    print(f"\n🎉 Kaam poora! Saari {total} JSON files save ho gayi.")


if __name__ == "__main__":
    main()