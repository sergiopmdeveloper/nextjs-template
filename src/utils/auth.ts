import { SignJWT } from 'jose';

const key = new TextEncoder().encode(process.env.SECRET);

export const sessionCookie = {
  name: 'sessionId',
  options: { httpOnly: true, secure: true, path: '/' },
  duration: 24 * 60 * 60 * 1000,
};

/**
 * Generates a JWT with the given payload.
 * @param {Record<string, unknown>} [payload] - The payload to include in the JWT.
 * @returns {Promise<string>} A promise that resolves to the signed JWT.
 */
export async function generateJwt(
  payload?: Record<string, unknown>
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key);
}
