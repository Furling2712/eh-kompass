import { defineMiddleware } from 'astro:middleware';
import {
  COOKIE_NAME,
  CLIENT_COOKIE_NAME,
  ADMIN_COOKIE_NAME,
  verifySessionCookieValue,
  verifyClientSessionCookieValue,
  verifyAdminSessionCookieValue,
} from './lib/auth';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Fortbildungs-Gesamtübersicht: eigenes Admin-Passwort, bewusst getrennt vom allgemeinen
  // Mitarbeiterbereich weiter unten. Grund: sonst könnte jede Person mit dem geteilten
  // Mitarbeiter-Passwort die Fortbildungs-Nachweise aller Kolleg:innen einsehen (DSGVO). Der
  // gesamte Pfad wird hier abschließend behandelt, inkl. der eigenen Login-Seite, damit er nicht
  // zusätzlich in die allgemeine Mitarbeiter-Prüfung weiter unten fällt.
  const isFobiAdmin = pathname.startsWith('/mitarbeiter/fortbildungen');
  const isFobiAdminLogin = pathname === '/mitarbeiter/fortbildungen/login';

  if (isFobiAdmin) {
    if (!isFobiAdminLogin) {
      const cookie = context.cookies.get(ADMIN_COOKIE_NAME)?.value;
      if (!verifyAdminSessionCookieValue(cookie)) {
        return context.redirect(`/mitarbeiter/fortbildungen/login?next=${encodeURIComponent(pathname)}`);
      }
    }
    return next();
  }

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
