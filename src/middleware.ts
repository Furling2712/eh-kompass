import { defineMiddleware } from 'astro:middleware';
import {
  COOKIE_NAME,
  CLIENT_COOKIE_NAME,
  verifySessionCookieValue,
  verifyClientSessionCookieValue,
} from './lib/auth';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  const isStaffArea = pathname.startsWith('/mitarbeiter');
  const isStaffLoginRoute = pathname === '/mitarbeiter/login';

  if (isStaffArea && !isStaffLoginRoute) {
    const cookie = context.cookies.get(COOKIE_NAME)?.value;
    if (!verifySessionCookieValue(cookie)) {
      return context.redirect(`/mitarbeiter/login?next=${encodeURIComponent(pathname)}`);
    }
  }

  const isBewoApi = pathname.startsWith('/online-bewo/api/');
  const isBewoSprechstunde = pathname.startsWith('/online-bewo/sprechstunde');

  if (isBewoApi || isBewoSprechstunde) {
    const cookie = context.cookies.get(CLIENT_COOKIE_NAME)?.value;
    if (!verifyClientSessionCookieValue(cookie)) {
      if (isBewoApi) {
        return new Response(JSON.stringify({ error: 'unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return context.redirect(`/online-bewo/login?next=${encodeURIComponent(pathname)}`);
    }
  }

  return next();
});
