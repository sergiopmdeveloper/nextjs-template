import { generateToken } from '@/app/_features/auth/utils';
import db from '@/app/_features/prisma/db';
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

/**
 * Gets a session via their ID.
 * @param {string} sessionId - The ID of the session.
 * @returns {Promise<Session | null>} The user if exists or null.
 */
export async function getSessionById(
  sessionId: string
): Promise<Session | null> {
  return await db.session.findUnique({
    where: {
      id: sessionId,
    },
  });
}
