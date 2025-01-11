import { generateToken } from '@/app/_utils/auth';
import db from '@/app/_utils/prisma';
import type { Session } from '@prisma/client';

/**
 * Creates a new session.
 * @param {string} userId - The user ID of the session to be created.
 * @returns {Promise<Session>} The session.
 */
export async function createSession(userId: string): Promise<Session> {
  const token = await generateToken();

  const session = await db.session.create({
    data: {
      userId,
      token,
    },
  });

  return session;
}
