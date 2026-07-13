import { createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import { STAFF_PASSWORD_HASH, STAFF_SESSION_SECRET } from 'astro:env/server';

// Aktuell: ein gemeinsames Passwort für alle Mitarbeiter (kein Nutzer-Datensatz nötig).
//
// Später, wenn Einzel-Accounts oder der Online-BeWo-Klientenbereich dazukommen:
// `verifyPassword(password)` durch `verifyUser(identifier, password): userId | null` ersetzen
// und die zurückgegebene userId mit in die Session-Payload packen. Der Cookie-Signier-/
// Prüfmechanismus unten sowie alle Aufrufstellen (Middleware, Login-Route) bleiben unverändert.

export const COOKIE_NAME = 'staff_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 Tage

function timingSafeStringEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyPassword(password: string): boolean {
  const [saltHex, hashHex] = STAFF_PASSWORD_HASH.split(':');
  if (!saltHex || !hashHex) return false;

  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');
  const actual = scryptSync(password, salt, expected.length);

  return timingSafeStringEqual(actual, expected);
}

function sign(payload: string): string {
  return createHmac('sha256', STAFF_SESSION_SECRET).update(payload).digest('base64url');
}

export function createSessionCookieValue(): string {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_SECONDS * 1000 })).toString(
    'base64url'
  );
  return `${payload}.${sign(payload)}`;
}

export function verifySessionCookieValue(value: string | undefined): boolean {
  if (!value) return false;

  const [payload, signature] = value.split('.');
  if (!payload || !signature) return false;

  const expectedSignature = sign(payload);
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

export { SESSION_TTL_SECONDS };
