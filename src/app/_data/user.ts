import db from '@/app/_utils/prisma';
import type { User } from '@prisma/client';

/**
 * Gets a user via their email.
 * @param {string} email - The email of the user.
 * @returns {Promise<User | null>} The user if exists or null.
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return await db.user.findUnique({
    where: { email },
  });
}
