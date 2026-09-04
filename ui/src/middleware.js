import { NextResponse } from 'next/server';

/**
 * Middleware that restricts the scraper page and API to localhost only.
 * Any request to /scraper or /api/scraper from a non-local hostname
 * receives a 403 Forbidden response.
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only protect scraper routes
  if (!pathname.startsWith('/scraper') && !pathname.startsWith('/api/scraper')) {
    return NextResponse.next();
  }

  // Allow if the Host header indicates localhost
  const host = request.headers.get('host') || '';
  const isLocal =
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1') ||
    host.startsWith('[::1]');

  if (isLocal) {
    return NextResponse.next();
  }

  // Also trust the request.ip (set by the runtime)
  const ip = request.ip;
  if (
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip === '::ffff:127.0.0.1'
  ) {
    return NextResponse.next();
  }

  return new NextResponse(
    JSON.stringify({ error: 'Forbidden: scraper is only accessible from localhost' }),
    {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

export const config = {
  matcher: [
    // Match /scraper, /scraper/*, /api/scraper, /api/scraper/*
    '/scraper',
    '/scraper/:path*',
    '/api/scraper',
    '/api/scraper/:path*',
  ],
};
