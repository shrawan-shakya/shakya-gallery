import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostHeader = request.headers.get('host') || '';
  
  if (hostHeader.startsWith('www.')) {
    const newHost = hostHeader.replace(/^www\./, '');
    const protocol = request.headers.get('x-forwarded-proto') || (hostHeader.includes('localhost') ? 'http' : 'https');
    return new Response(null, {
      status: 301,
      headers: {
        Location: `${protocol}://${newHost}${request.nextUrl.pathname}${request.nextUrl.search}`,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
