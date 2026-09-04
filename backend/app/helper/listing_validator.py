"""
Listing validator: Validate and correct business location assignments.

Main logic:
1. Extract address components (pincode, area)
2. Find candidate locations matching extracted data
3. Compare with target location assignment
4. Determine validation status: valid, reassigned, needs_review
5. Return structured validation result with confidence score
"""

from math import radians, cos, sin, asin, sqrt


class ListingValidator:
    """Validate and correct listing location assignments."""

    # Confidence thresholds
    HIGH_CONFIDENCE_THRESHOLD = 0.7  # Min confidence to auto-reassign
    MEDIUM_CONFIDENCE_THRESHOLD = 0.5  # Min confidence to suggest

    def __init__(self, address_parser, location_repository):
        """
        Initialize validator.

        Args:
            address_parser: AddressParser instance
            location_repository: Object with get_location(loc_id) method
        """
        self.parser = address_parser
        self.repo = location_repository

    def validate(self, listing, target_location, verbose=False):
        """
        Validate a listing's location assignment.

        Args:
            listing: Listing model instance with attributes:
                - id, business_id, address, location_id, google_map_url
                - business.name (for display)
            target_location: Location model instance (current assigned location)
            verbose: bool, print debug info

        Returns:
            dict with keys:
                - status: 'valid' | 'reassigned' | 'needs_review'
                - corrected_location_id: int or None
                - corrected_location_name: str or None
                - validation_method: str (e.g., 'Pincode Matching', 'Area Name')
                - confidence: float (0.0-1.0)
                - extracted_pincode: str or None
                - extracted_area: str or None
                - notes: str (human-readable explanation)
        """

        address = listing.address or ''
        extracted_pincode = self.parser.extract_pincode(address)
        extracted_area = self.parser.extract_area(address)

        if verbose:
            print(f"[{listing.business.name}]")
            print(f"  Address: {address}")
            print(f"  Extracted: pincode={extracted_pincode}, area={extracted_area}")

        # Get candidate locations (sorted by confidence)
        candidates = self.parser.find_matching_location(extracted_pincode, extracted_area)

        if verbose:
            print(f"  Candidates: {candidates}")

        if not candidates:
            # No matching location found
            return {
                'listing_id': listing.id,
                'business_id': listing.business_id,
                'original_location_id': listing.location_id,
                'original_location_name': target_location.name,
                'corrected_location_id': None,
                'corrected_location_name': None,
                'status': 'needs_review',
                'validation_method': 'Address Parsing (Inconclusive)',
                'confidence': 0.0,
                'extracted_pincode': extracted_pincode,
                'extracted_area': extracted_area,
                'notes': 'No matching location found. Address unclear, unusual format, or missing key data (pincode/area).',
                'action_required': True
            }

        best_candidate = candidates[0]
        best_location_id = best_candidate['location_id']
        best_confidence = best_candidate['confidence']
        best_method = best_candidate['match_method']

        # Case 1: Best match is the target location → VALID
        if best_location_id == target_location.id:
            return {
                'listing_id': listing.id,
                'business_id': listing.business_id,
                'original_location_id': listing.location_id,
                'original_location_name': target_location.name,
                'corrected_location_id': target_location.id,
                'corrected_location_name': target_location.name,
                'status': 'valid',
                'validation_method': best_method,
                'confidence': best_confidence,
                'extracted_pincode': extracted_pincode,
                'extracted_area': extracted_area,
                'notes': f'Assignment confirmed via {best_method}. Business correctly assigned to {target_location.name}.',
                'action_required': False
            }

        # Case 2: Best match is different location with HIGH confidence → REASSIGN
        elif best_confidence >= self.HIGH_CONFIDENCE_THRESHOLD:
            corrected_location = self.repo.get_location(best_location_id)
            return {
                'listing_id': listing.id,
                'business_id': listing.business_id,
                'original_location_id': listing.location_id,
                'original_location_name': target_location.name,
                'corrected_location_id': best_location_id,
                'corrected_location_name': corrected_location.name,
                'status': 'reassigned',
                'validation_method': best_method,
                'confidence': best_confidence,
                'extracted_pincode': extracted_pincode,
                'extracted_area': extracted_area,
                'notes': (
                    f'❌ MISMATCH DETECTED: Business was assigned to {target_location.name} '
                    f'but should be in {corrected_location.name} '
                    f'(confidence: {best_confidence:.0%}). '
                    f'Extracted data: {extracted_area or extracted_pincode or "unknown"}. '
                    f'Will be moved to {corrected_location.name}.'
                ),
                'action_required': True,
                'recommended_action': 'auto_reassign'
            }

        # Case 3: Possible match but MEDIUM/LOW confidence → NEEDS REVIEW
        else:
            corrected_location = self.repo.get_location(best_location_id)
            return {
                'listing_id': listing.id,
                'business_id': listing.business_id,
                'original_location_id': listing.location_id,
                'original_location_name': target_location.name,
                'corrected_location_id': best_location_id,
                'corrected_location_name': corrected_location.name,
                'status': 'needs_review',
                'validation_method': best_method,
                'confidence': best_confidence,
                'extracted_pincode': extracted_pincode,
                'extracted_area': extracted_area,
                'notes': (
                    f'⚠️ UNCERTAIN: Possible mismatch — business currently in {target_location.name} '
                    f'but might belong to {corrected_location.name} '
                    f'(confidence only {best_confidence:.0%}). '
                    f'Extracted data: {extracted_area or extracted_pincode or "unknown"}. '
                    f'Manual review recommended.'
                ),
                'action_required': True,
                'recommended_action': 'manual_review'
            }

    @staticmethod
    def haversine_distance(lat1, lon1, lat2, lon2):
        """
        Calculate great-circle distance between two lat/long points in km.

        Args:
            lat1, lon1: First point (decimal degrees)
            lat2, lon2: Second point (decimal degrees)

        Returns:
            float: Distance in kilometers
        """
        try:
            lat1, lon1, lat2, lon2 = map(float, [lat1, lon1, lat2, lon2])
            lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

            dlat = lat2 - lat1
            dlon = lon2 - lon1

            a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
            c = 2 * asin(sqrt(a))
            r = 6371  # Earth radius in km

            return c * r
        except (TypeError, ValueError):
            return None


# Helper: Simple location repository for testing
class LocationRepository:
    """Simple location repository for validation."""

    def __init__(self, db_session):
        """
        Args:
            db_session: SQLAlchemy session
        """
        self.db = db_session

    def get_location(self, location_id):
        """Get location by ID."""
        # Lazy import to avoid circular imports
        from app.listing.models import Location
        return self.db.query(Location).get(location_id)

    def get_all_locations(self):
        """Get all active locations."""
        from app.listing.models import Location
        return self.db.query(Location).filter_by(is_active=True).all()

