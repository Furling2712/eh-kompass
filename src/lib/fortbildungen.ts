import { randomBytes, createHmac } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { mitarbeiterListe, type MitarbeiterEintrag } from '../data/mitarbeiter';
import { fortbildungen, type Fortbildung } from '../data/fortbildungen';

// Basis-URL für die Magic-Links in den Mails. Muss zur `site`-Angabe in astro.config.mjs passen.
const SITE_URL = 'https://eh-kompass.de';

// Absenderadresse für die Fortbildungs-Mails.
// TEMPORÄR: bis eh-kompass.de bei Resend per DNS verifiziert ist, läuft der Versand über
// Resends eigene Testdomain onboarding@resend.dev. Die funktioniert ohne Verifizierung, kann
// aber NUR an die Mailadresse zustellen, mit der der Resend-Account registriert ist
// (aktuell alexander.radler@ptv-euregio.de). Sobald die Domain verifiziert ist: zurück auf
// 'EH-Kompass Fortbildungen <fortbildungen@eh-kompass.de>' stellen.
const ABSENDER = 'EH-Kompass Fortbildungen <onboarding@resend.dev>';

// Diese Datei wird auch von netlify/functions/fortbildungen-erinnerung.mts importiert – einer
// eigenständigen Netlify Function außerhalb des Astro-Builds, die `astro:env/server` nicht
// auflösen kann. Deshalb wird der Resend-API-Key als Parameter durchgereicht statt hier direkt
// importiert; Astro-Seiten/-Routen holen ihn per `astro:env/server`, die Function per `process.env`.

export interface TokenEintrag {
  token: string;
  mitarbeiterId: string;
  fobiId: string;
  erstelltAm: number;
  status: 'offen' | 'bestanden';
  bestandenAm?: number;
  punkteProzent?: number;
}

export interface StatusEintrag {
  mitarbeiterId: string;
  fobiId: string;
  zuletztBestandenAm: number;
  /** Zeitstempel der letzten Erinnerungsmail für den aktuellen Fälligkeits-Zyklus, oder null. */
  erinnertAm: number | null;
}

function getFortbildungenStore() {
  return getStore({ name: 'fortbildungen', consistency: 'strong' });
}

// Doppelpunkt als Trenner vermeiden: Netlify Blobs kodiert Keys beim Schreiben/Auflisten nicht
// konsistent (`status:a:b` landet intern als `status%3Aa%3Ab`), wodurch ein Prefix-Filter wie
// `status:` bei `store.list()` leer bleibt. Doppelter Unterstrich ist unkritisch.
const STATUS_PREFIX = 'status__';

function tokenKey(token: string): string {
  return `token__${token}`;
}

function statusKey(mitarbeiterId: string, fobiId: string): string {
  return `${STATUS_PREFIX}${mitarbeiterId}__${fobiId}`;
}

export function sanitizeToken(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(trimmed)) return null;
  return trimmed;
}

export function findMitarbeiter(id: string): MitarbeiterEintrag | undefined {
  return mitarbeiterListe.find((m) => m.id === id);
}

export function findFortbildung(id: string): Fortbildung | undefined {
  return fortbildungen.find((f) => f.id === id);
}

/**
 * Datum, ab dem eine Fortbildung nach `gueltigkeitMonate` erneut fällig wird. Rechnet in echten
 * Kalendermonaten (nicht mit einer 30-Tage-Näherung) – sonst wird bei 12 Monaten Gültigkeit jede
 * Fortbildung ca. 5 Tage zu früh fällig (12 × 30 = 360 statt ~365 Tage).
 */
export function faelligkeitsDatum(zuletztBestandenAm: number, gueltigkeitMonate: number): number {
  const datum = new Date(zuletztBestandenAm);
  datum.setMonth(datum.getMonth() + gueltigkeitMonate);
  return datum.getTime();
}

/**
 * Persönlicher, nicht ratebarer Token je Mitarbeiter:in für die eigene Status-Ansicht
 * (/fortbildungen/status/[token]) – bewusst getrennt vom Mitarbeiter-Login, damit jede Person nur
 * ihren eigenen Stand sieht, ohne sich extra einzuloggen. Deterministisch aus der Mitarbeiter-ID
 * abgeleitet (HMAC mit STATUS_LINK_SECRET), daher kein eigener Speicher nötig – der Link bleibt
 * stabil und lässt sich bei Bedarf jederzeit erneut aus der Admin-Übersicht ablesen.
 */
export function mitarbeiterStatusToken(mitarbeiterId: string, secret: string): string {
  return createHmac('sha256', secret).update(mitarbeiterId).digest('base64url').slice(0, 24);
}

export function findMitarbeiterByStatusToken(token: string, secret: string): MitarbeiterEintrag | undefined {
  return mitarbeiterListe.find((m) => mitarbeiterStatusToken(m.id, secret) === token);
}

export function statusLink(mitarbeiterId: string, secret: string): string {
  return `${SITE_URL}/fortbildungen/status/${mitarbeiterStatusToken(mitarbeiterId, secret)}`;
}

async function sendeMail(apiKey: string, an: string, betreff: string, html: string): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: ABSENDER, to: an, subject: betreff, html }),
  });

  if (!res.ok) {
    throw new Error(`Mailversand fehlgeschlagen (${res.status}): ${await res.text()}`);
  }
}

/** Erstellt einen neuen Zugangs-Token für eine Mitarbeiter:in + Fortbildung und speichert ihn. */
export async function erstelleZugang(
  mitarbeiterId: string,
  fobiId: string
): Promise<{ token: string; mitarbeiter: MitarbeiterEintrag; fobi: Fortbildung }> {
  const mitarbeiter = findMitarbeiter(mitarbeiterId);
  const fobi = findFortbildung(fobiId);
  if (!mitarbeiter || !fobi) {
    throw new Error('Unbekannte Mitarbeiter-ID oder Fortbildungs-ID');
  }

  const token = randomBytes(24).toString('base64url');
  const eintrag: TokenEintrag = {
    token,
    mitarbeiterId,
    fobiId,
    erstelltAm: Date.now(),
    status: 'offen',
  };

  await getFortbildungenStore().setJSON(tokenKey(token), eintrag);
  return { token, mitarbeiter, fobi };
}

function testLink(token: string): string {
  return `${SITE_URL}/fortbildungen/test/${token}`;
}

export async function sendeZugangsMail(
  apiKey: string,
  mitarbeiter: MitarbeiterEintrag,
  fobi: Fortbildung,
  token: string,
  statusLinkSecret: string
): Promise<void> {
  const link = testLink(token);
  const eigenerStatus = statusLink(mitarbeiter.id, statusLinkSecret);
  await sendeMail(
    apiKey,
    mitarbeiter.email,
    `Zugang zur Pflicht-Fortbildung „${fobi.titel}“`,
    `<p>Hallo ${mitarbeiter.name},</p>
     <p>für dich steht die Pflicht-Fortbildung „${fobi.titel}“ an. Über den folgenden Link kommst du direkt zum Test:</p>
     <p><a href="${link}">${link}</a></p>
     <p>${fobi.beschreibung}</p>
     <p style="margin-top:1.5em;font-size:0.9em;color:#555">Deinen persönlichen Stand bei allen Pflicht-Fortbildungen kannst du jederzeit über diesen Link einsehen: <a href="${eigenerStatus}">${eigenerStatus}</a></p>`
  );
}

export async function sendeErinnerungsMail(
  apiKey: string,
  mitarbeiter: MitarbeiterEintrag,
  fobi: Fortbildung,
  token: string,
  statusLinkSecret: string
): Promise<void> {
  const link = testLink(token);
  const eigenerStatus = statusLink(mitarbeiter.id, statusLinkSecret);
  await sendeMail(
    apiKey,
    mitarbeiter.email,
    `Erinnerung: Auffrischung der Fortbildung „${fobi.titel}“`,
    `<p>Hallo ${mitarbeiter.name},</p>
     <p>deine Pflicht-Fortbildung „${fobi.titel}“ liegt jetzt ${fobi.gueltigkeitMonate} Monate zurück und muss aufgefrischt werden.</p>
     <p>Über den folgenden Link kommst du direkt zum Test:</p>
     <p><a href="${link}">${link}</a></p>
     <p style="margin-top:1.5em;font-size:0.9em;color:#555">Deinen persönlichen Stand bei allen Pflicht-Fortbildungen kannst du jederzeit über diesen Link einsehen: <a href="${eigenerStatus}">${eigenerStatus}</a></p>`
  );
}

export async function ladeToken(token: string): Promise<TokenEintrag | null> {
  return (await getFortbildungenStore().get(tokenKey(token), { type: 'json' })) as TokenEintrag | null;
}

/** Fragen ohne Lösungsindex, zum Rendern auf der Test-Seite. */
export function fragenOhneLoesung(fobi: Fortbildung) {
  return fobi.fragen.map((f) => ({ frage: f.frage, antworten: f.antworten }));
}

/**
 * Wertet eine Einreichung serverseitig aus, aktualisiert bei Bestehen den Token- und
 * Status-Eintrag. `antworten` ist ein Array von gewählten Antwort-Indizes, ein Eintrag pro Frage.
 */
export async function verarbeiteEinreichung(
  token: string,
  antworten: number[]
): Promise<
  | { ok: true; bestanden: boolean; punkteProzent: number }
  | { ok: false; grund: 'ungueltiger_token' | 'bereits_bestanden' }
> {
  const store = getFortbildungenStore();
  const eintrag = (await store.get(tokenKey(token), { type: 'json' })) as TokenEintrag | null;
  if (!eintrag) return { ok: false, grund: 'ungueltiger_token' };
  if (eintrag.status === 'bestanden') return { ok: false, grund: 'bereits_bestanden' };

  const fobi = findFortbildung(eintrag.fobiId);
  if (!fobi) return { ok: false, grund: 'ungueltiger_token' };

  const richtig = fobi.fragen.filter((f, i) => antworten[i] === f.richtigIndex).length;
  const punkteProzent = fobi.fragen.length > 0 ? Math.round((richtig / fobi.fragen.length) * 100) : 0;
  const bestanden = punkteProzent >= fobi.bestehensgrenzeProzent;

  if (bestanden) {
    const jetzt = Date.now();
    eintrag.status = 'bestanden';
    eintrag.bestandenAm = jetzt;
    eintrag.punkteProzent = punkteProzent;
    await store.setJSON(tokenKey(token), eintrag);

    const status: StatusEintrag = {
      mitarbeiterId: eintrag.mitarbeiterId,
      fobiId: eintrag.fobiId,
      zuletztBestandenAm: jetzt,
      erinnertAm: null,
    };
    await store.setJSON(statusKey(eintrag.mitarbeiterId, eintrag.fobiId), status);
  }

  return { ok: true, bestanden, punkteProzent };
}

/** Für die tägliche Erinnerungs-Prüfung: alle Mitarbeiter:innen, deren Fortbildung fällig ist. */
export async function ermittleFaelligeFaelle(): Promise<StatusEintrag[]> {
  const store = getFortbildungenStore();
  const { blobs } = await store.list({ prefix: STATUS_PREFIX });
  const jetzt = Date.now();
  const faellig: StatusEintrag[] = [];

  for (const blob of blobs) {
    const status = (await store.get(blob.key, { type: 'json' })) as StatusEintrag | null;
    if (!status) continue;

    const fobi = findFortbildung(status.fobiId);
    if (!fobi) continue;

    const faelligAb = faelligkeitsDatum(status.zuletztBestandenAm, fobi.gueltigkeitMonate);
    const schonErinnert = status.erinnertAm !== null && status.erinnertAm > status.zuletztBestandenAm;

    if (jetzt >= faelligAb && !schonErinnert) {
      faellig.push(status);
    }
  }

  return faellig;
}

export async function markiereErinnert(status: StatusEintrag): Promise<void> {
  const store = getFortbildungenStore();
  const aktualisiert: StatusEintrag = { ...status, erinnertAm: Date.now() };
  await store.setJSON(statusKey(status.mitarbeiterId, status.fobiId), aktualisiert);
}

export async function ladeAlleStatus(): Promise<StatusEintrag[]> {
  const store = getFortbildungenStore();
  const { blobs } = await store.list({ prefix: STATUS_PREFIX });
  const ergebnisse: StatusEintrag[] = [];
  for (const blob of blobs) {
    const status = (await store.get(blob.key, { type: 'json' })) as StatusEintrag | null;
    if (status) ergebnisse.push(status);
  }
  return ergebnisse;
}

/** Status nur für eine einzelne Mitarbeiter:in, für die persönliche Status-Seite. */
export async function ladeStatusFuerMitarbeiter(mitarbeiterId: string): Promise<StatusEintrag[]> {
  const store = getFortbildungenStore();
  const ergebnisse: StatusEintrag[] = [];
  for (const f of fortbildungen) {
    const status = (await store.get(statusKey(mitarbeiterId, f.id), { type: 'json' })) as StatusEintrag | null;
    if (status) ergebnisse.push(status);
  }
  return ergebnisse;
}
