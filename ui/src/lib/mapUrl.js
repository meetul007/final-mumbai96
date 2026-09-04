// ── Google Maps URL helpers ─────────────────────────────────────────
//
// Listing records store `google_map_url` which can be one of:
//   - a place link          (https://www.google.com/maps/place/...!3d<lat>!4d<lng>...)
//   - a synthesized query   (https://maps.google.com/?q=... or /maps/place/...)
//   - an embed-only URL     (https://www.google.com/maps?q=...,...&output=embed
//                            or https://www.google.com/maps/embed?pb=...)
//
// Embed URLs only render inside an <iframe>. When opened directly in a
// browser tab they show an error page. These helpers let the UI render
// the embed URL via an iframe and still produce browser-safe links for
// the outbound buttons.

/**
 * Detect if a Google Maps URL is embed-only (iframe required).
 */
export function isEmbedMapUrl(url = "") {
  if (!url) return false;
  const u = String(url);
  return /\/maps\/embed([\/?]|$)/.test(u) || /[?&]output=embed(\b|&|$)/.test(u);
}

/**
 * Convert a Google Maps URL into one that opens correctly in a normal
 * browser tab. Non-embed URLs pass through unchanged.
 *
 * @param {string} url      raw google_map_url value
 * @param {string} address  listing address, used as fallback query
 * @returns {string}        browser-safe map link
 */
export function openableMapUrl(url = "", address = "") {
  if (!url) return googleMapsSearchUrl(address);
  const u = String(url);

  // Regular place/search/directions links work in a browser as-is.
  if (!isEmbedMapUrl(u)) return u;

  // "output=embed" variant: dropping the param turns it into a normal map link.
  if (/[?&]output=embed(\b|&|$)/.test(u)) {
    let cleaned = u.replace(/[?&]output=embed/g, "");
    // Tidy up stray delimiters left behind by the removal.
    cleaned = cleaned.replace(/^([^?]*?)&/, "$1?"); // "…maps&z=15" -> "…maps?z=15"
    cleaned = cleaned.replace(/(\?)&+/, "$1"); // "?&z=15" -> "?z=15"
    cleaned = cleaned.replace(/&+$/, ""); // trailing "&"
    cleaned = cleaned.replace(/[?&]$/, ""); // empty query "?"
    return cleaned;
  }

  // "/maps/embed?pb=..." cannot be reliably reverse-engineered to a place
  // link, so fall back to a map search centered on the address.
  return googleMapsSearchUrl(address);
}

/**
 * Build a standard Google Maps search URL (works everywhere).
 */
export function googleMapsSearchUrl(address = "") {
  const q = encodeURIComponent(String(address || "").trim());
  if (!q) return "https://www.google.com/maps";
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

/**
 * Extract the {lat, lng} pair from a stored map URL. Supports two shapes:
 *   1. Our own synthesized format:  ...maps?q=<lat>,<lng>&z=...
 *   2. Google's own place-link format: .../place/...!3d<lat>!4d<lng>...
 * Returns null if neither pattern matches.
 */
export function extractLatLng(url = "") {
  if (!url) return null;
  const u = String(url);

  const qMatch = u.match(/[?&]q=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (qMatch) return { lat: qMatch[1], lng: qMatch[2] };

  const placeMatch = u.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (placeMatch) return { lat: placeMatch[1], lng: placeMatch[2] };

  return null;
}

/**
 * Build a Get-Directions link. Prefers the exact coordinates behind the
 * stored map URL (so it always agrees with the map pin and "Open in
 * Google Maps"); falls back to an address-text search only when no
 * coordinates are available for this listing.
 */
export function directionsUrl(mapUrl = "", address = "") {
  const coords = extractLatLng(mapUrl);
  if (coords) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}`;
  }
  return `https://maps.google.com/dir/?api=1&destination=${encodeURIComponent(
    address || "",
  )}`;
}
