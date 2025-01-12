export const KEY = new TextEncoder().encode(process.env.SECRET);

export const SESSION_ID_COOKIE = {
  name: 'sessionId',
  options: { httpOnly: true, secure: true, path: '/' },
  duration: 24 * 60 * 60 * 1000,
};

export const AUTH_PATHS = ['/sign-in'];
export const PROTECTED_PATHS = ['/account'];
