import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import {
  STAFF_PASSWORD_HASH,
  STAFF_SESSION_SECRET,
  CLIENT_PASSWORD_HASH,
  CLIENT_SESSION_SECRET,
} from 'astro:env/server';

// Aktuell: ein gemeinsames Passwort für alle Mitarbeiter (kein Nutzer-Datensatz nötig).
//
// Später, wenn Einzel-Accounts dazukommen: `verifyPassword(password)` durch
// `verifyUser(identifier, password): userId | null` ersetzen und die zurückgegebene userId
// mit in die Session-Payload packen. Der Cookie-Signier-/Prüfmechanismus unten sowie alle
// Aufrufstellen (Middleware, Login-Route) bleiben unverändert.

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 Tage

function timingSafeStringEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

function verifyPasswordAgainstHash(password: string, passwordHash: string): boolean {
  const [saltHex, hashHex] = passwordHash.split(':');
  if (!saltHex || !hashHex) return false;

  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');
  const actual = scryptSync(password, salt, expected.length);

  return timingSafeStringEqual(actual, expected);
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function createSignedSessionCookieValue(secret: string): string {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_SECONDS * 1000 })).toString(
    'base64url'
  );
  return `${payload}.${sign(payload, secret)}`;
}

function verifySignedSessionCookieValue(value: string | undefined, secret: string): boolean {
  if (!value) return false;

  const [payload, signature] = value.split('.');
  if (!payload || !signature) return false;

  const expectedSignature = sign(payload, secret);
  const sigBuffer = Buffer.from(signature);
  const expectedSigBuffer = Buffer.from(expectedSignature);
  if (!timingSafeStringEqual(sigBuffer, expectedSigBuffer)) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

// --- Mitarbeiterbereich (/mitarbeiter) ---

export const COOKIE_NAME = 'staff_session';

export function verifyPassword(password: string): boolean {
  return verifyPasswordAgainstHash(password, STAFF_PASSWORD_HASH);
}

export function createSessionCookieValue(): string {
  return createSignedSessionCookieValue(STAFF_SESSION_SECRET);
}

export function verifySessionCookieValue(value: string | undefined): boolean {
  return verifySignedSessionCookieValue(value, STAFF_SESSION_SECRET);
}

// --- Online-BeWo-Klientenbereich (/online-bewo/sprechstunde) ---
// Eigener, gemeinsamer Zugangscode für Klient:innen – bewusst getrennt vom
// Mitarbeiter-Passwort, damit ein Klienten-Code niemals Zugriff auf den Mitarbeiterbereich gibt.

export const CLIENT_COOKIE_NAME = 'bewo_session';

export function verifyClientPassword(password: string): boolean {
  return verifyPasswordAgainstHash(password, CLIENT_PASSWORD_HASH);
}

export function createClientSessionCookieValue(): string {
  return createSignedSessionCookieValue(CLIENT_SESSION_SECRET);
}

export function verifyClientSessionCookieValue(value: string | undefined): boolean {
  return verifySignedSessionCookieValue(value, CLIENT_SESSION_SECRET);
}

export { SESSION_TTL_SECONDS };
