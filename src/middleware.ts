import {
  AUTH_PATHS,
  PROTECTED_PATHS,
  SESSION_ID_COOKIE,
} from '@/app/_constants/auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
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
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
