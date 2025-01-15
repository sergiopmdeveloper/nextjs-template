import { createSession } from '@/app/_data/session';
import { KEY, SESSION_ID_COOKIE } from '@/app/_features/auth/constants';
import type { User } from '@prisma/client';
import argon2 from 'argon2';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Verifies that a password matches the password of a user.
 * @param {User} user - The given user.
 * @param {string} password - The given password.
 * @returns {Promise<boolean>} True if the password matches and false if not.
 */
export async function verifyUserPassword(
  user: User,
  password: string
): Promise<boolean> {
  return await argon2.verify(user.password, password);
}

/**
 * Generates a token with the given payload.
 * @param {Record<string, unknown>} [payload] - The payload to include in the token.
 * @returns {Promise<string>} The signed token.
 */
export async function generateToken(
  payload?: Record<string, unknown>
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(KEY);
}

/**
 * Authenticates a user by creating a new session and redirecting the user to the account page.
 * @param {string} userId - The ID of the user to be authenticated.
 * @returns {Promise<Never>} - The redirection to account page.
 */
export async function authenticateUser(userId: string): Promise<never> {
  const cookieStore = await cookies();

  const { id: sessionId } = await createSession(userId);

  cookieStore.set(SESSION_ID_COOKIE.name, sessionId, {
    ...SESSION_ID_COOKIE.options,
    expires: new Date(Date.now() + SESSION_ID_COOKIE.duration),
  });

  redirect('/account');
}
