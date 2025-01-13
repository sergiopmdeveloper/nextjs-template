import { KEY, SESSION_ID_COOKIE } from '@/app/_constants/auth';
import { getSessionById } from '@/app/_data/session';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

/**
 * GET method | Verify session endpoint that validates that a session is valid.
 * @param {Request} _ - The request object.
 * @returns {Promise<Response>} The response object.
 */
export async function GET(_: Request): Promise<Response> {
  const cookieStore = await cookies();

  const sessionIdCookie = cookieStore.get(SESSION_ID_COOKIE.name);

  if (!sessionIdCookie) {
    return Response.json(
      { detail: 'Session ID cookie not found.' },
      { status: 400 }
    );
  }

  const session = await getSessionById(sessionIdCookie.value);

  if (!session) {
    return Response.json(
      { detail: 'Session not found fot the given session ID.' },
      { status: 404 }
    );
  }

  try {
    await jwtVerify(session.token, KEY, { algorithms: ['HS256'] });

    return new Response('Session is valid.', {
      status: 200,
    });
  } catch (error) {
    return Response.json({ detail: 'Session has expired.' }, { status: 410 });
  }
}
