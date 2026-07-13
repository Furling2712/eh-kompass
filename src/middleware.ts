import { defineMiddleware } from 'astro:middleware';
import { COOKIE_NAME, verifySessionCookieValue } from './lib/auth';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  const isStaffArea = pathname.startsWith('/mitarbeiter');
  const isLoginRoute = pathname === '/mitarbeiter/login';

  if (!isStaffArea || isLoginRoute) {
    return next();
  }

  const cookie = context.cookies.get(COOKIE_NAME)?.value;
  if (!verifySessionCookieValue(cookie)) {
    return context.redirect(`/mitarbeiter/login?next=${encodeURIComponent(pathname)}`);
  }

  return next();
});
