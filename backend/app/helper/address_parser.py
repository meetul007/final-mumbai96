"""
Address parser: Extract meaningful components from address strings.

Handles Indian address format:
  "Shop 101, ABC Building, Borivali East, Mumbai 400066"
  → Extract pincode, area, locality, etc.
"""

import re
from difflib import SequenceMatcher


class AddressParser:
    """Extract components (pincode, area, locality) from address strings."""

    PINCODE_REGEX = r'\b\d{6}\b'
    COMMON_CITY_NAMES = ['mumbai', 'mumbai metropolitan', 'mum', 'maharashtra']
    COMMON_PREFIXES = ['shop', 'flat', 'plot', 'suite', 'office', 'building', 'house', 'apt', 'lane', 'road', 'street']

    def __init__(self, location_metadata):
        """
        Initialize parser with location reference data.

        Args:
            location_metadata: Dict mapping location_id → {name, pincodes, sub_areas}
                Example:
                {
                    1: {
                        'name': 'Borivali East',
                        'pincodes': ['400066', '400067'],
                        'sub_areas': ['Borivali Station East', 'Borivali Municipal School']
                    },
                    ...
                }
        """
        self.location_metadata = location_metadata or {}

    def extract_pincode(self, address):
        """
        Extract 6-digit Indian pincode from address.

        Args:
            address: Full address string

        Returns:
            str: Pincode (e.g., '400066') or None if not found
        """
        if not address:
            return None
        match = re.search(self.PINCODE_REGEX, str(address))
        return match.group(0) if match else None

    def extract_area(self, address):
        """
        Extract area/locality name from address.

        Strategy:
        1. Remove common city names & state names
        2. Split by comma & filter empty tokens
        3. Return relevant tokens (usually mid-to-end of address)

        Args:
            address: Full address string

        Returns:
            str: Area/locality name or None

        Example:
            "Shop 101, ABC Building, Borivali East, Mumbai 400066"
            → Returns: "Borivali East" (or nearby token)
        """
        if not address:
            return None

        clean = str(address).lower()

        # Remove common city/state names
        for city_name in self.COMMON_CITY_NAMES:
            clean = re.sub(rf'\b{city_name}\b', '', clean, flags=re.IGNORECASE)

        # Remove postcode & state abbreviations
        clean = re.sub(r'\b\d{6}\b', '', clean)  # Remove pincode
        clean = re.sub(r'\bmh\b|\bmaharashtra\b', '', clean, flags=re.IGNORECASE)

        # Split into tokens
        tokens = [t.strip() for t in clean.split(',') if t.strip()]

        if not tokens:
            return None

        # Filter out building/shop prefixes (often first token)
        meaningful_tokens = [
            t for t in tokens
            if not any(t.lower().startswith(prefix) for prefix in self.COMMON_PREFIXES)
        ]

        if meaningful_tokens:
            # Return the longest token (usually the area name)
            return max(meaningful_tokens, key=len)
        else:
            # Fall back to last token if all are prefixes
            return tokens[-1] if tokens else None

    def find_matching_location(self, pincode=None, area=None):
        """
        Find location(s) matching extracted pincode and/or area.

        Strategy:
        1. Pincode match → high confidence (0.95)
        2. Area name fuzzy match (>70% similarity) → medium confidence (0.7-0.95)
        3. Return sorted by confidence descending

        Args:
            pincode: str (e.g., '400066')
            area: str (e.g., 'Borivali East')

        Returns:
            List of (location_id, confidence) tuples, sorted by confidence DESC
            Empty list if no matches found

        Example:
            >>> find_matching_location('400066', 'Borivali East')
            [(1, 0.95), (2, 0.65)]  # location_id=1 (Borivali East) is best match
        """
        matches = []

        for loc_id, metadata in self.location_metadata.items():
            confidence = 0
            match_details = []

            # Method 1: Exact pincode match (highest confidence)
            if pincode:
                location_pincodes = metadata.get('pincodes', [])
                if pincode in location_pincodes:
                    confidence = max(confidence, 0.95)
                    match_details.append('pincode_match')

            # Method 2: Area name fuzzy match
            if area:
                location_name = metadata.get('name', '').lower()
                area_lower = area.lower()

                # Check location name
                name_ratio = SequenceMatcher(None, area_lower, location_name).ratio()
                if name_ratio > 0.7:
                    confidence = max(confidence, 0.75 + (name_ratio - 0.7) * 0.25)
                    match_details.append('location_name_match')

                # Check sub_areas
                for sub_area in metadata.get('sub_areas', []):
                    sub_ratio = SequenceMatcher(None, area_lower, sub_area.lower()).ratio()
                    if sub_ratio > 0.7:
                        confidence = max(confidence, 0.75 + (sub_ratio - 0.7) * 0.25)
                        match_details.append('subarea_match')
                        break  # Use best sub_area match

            if confidence > 0:
                matches.append({
                    'location_id': loc_id,
                    'location_name': metadata.get('name'),
                    'confidence': round(confidence, 3),
                    'match_method': ', '.join(match_details) if match_details else 'unknown'
                })

        # Sort by confidence descending
        matches.sort(key=lambda x: x['confidence'], reverse=True)
        return matches

    def extract_all(self, address):
        """
        Extract all components from an address.

        Args:
            address: Full address string

        Returns:
            dict with keys: pincode, area, extracted_text
        """
        return {
            'pincode': self.extract_pincode(address),
            'area': self.extract_area(address),
            'extracted_text': address
        }

