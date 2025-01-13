import {
  AUTH_PATHS,
  PROTECTED_PATHS,
  SESSION_ID_COOKIE,
} from '@/app/_constants/auth';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * App middleware.
 * @param {NextRequest} request - The request object.
 * @returns {Promise<Response | undefined>} The response object or undefined.
 */
export async function middleware(
  request: NextRequest
): Promise<Response | undefined> {
  const currentPath = request.nextUrl.pathname;
  const sessionIdCookie = request.cookies.get(SESSION_ID_COOKIE.name);

  if (AUTH_PATHS.includes(currentPath)) {
    if (sessionIdCookie) {
      return NextResponse.redirect(new URL('/account', request.url));
    }
  }

  if (PROTECTED_PATHS.includes(currentPath)) {
    if (!sessionIdCookie) {
      return NextResponse.redirect(
        new URL('/sign-in?status=unauthorized', request.url)
      );
    }

    const verifySessionResponse = await fetch(
      `${request.nextUrl.origin}/api/verify-session`,
      {
        method: 'GET',
        headers: {
          Cookie: `${SESSION_ID_COOKIE.name}=${sessionIdCookie.value}`,
        },
      }
    );

    const sessionIdCookieNotProvided = verifySessionResponse.status === 400;
    const sessionNotFound = verifySessionResponse.status === 404;
    const sessionExpired = verifySessionResponse.status === 410;

    if (sessionIdCookieNotProvided) {
      return NextResponse.redirect(
        new URL('/sign-in?status=unauthorized', request.url)
      );
    }

    if (sessionNotFound) {
      const response = NextResponse.redirect(
        new URL('/sign-in?status=unauthorized', request.url)
      );

      response.cookies.delete(SESSION_ID_COOKIE.name);

      return response;
    }

    if (sessionExpired) {
      const response = NextResponse.redirect(
        new URL('/sign-in?status=expired', request.url)
      );

      response.cookies.delete(SESSION_ID_COOKIE.name);

      return response;
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
