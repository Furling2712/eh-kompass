import { randomBytes } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { mitarbeiterListe, type MitarbeiterEintrag } from '../data/mitarbeiter';
import { fortbildungen, type Fortbildung } from '../data/fortbildungen';

// Basis-URL für die Magic-Links in den Mails. Muss zur `site`-Angabe in astro.config.mjs passen.
const SITE_URL = 'https://eh-kompass.de';

// Absenderadresse für die Fortbildungs-Mails. Muss in Resend als verifizierte Domain hinterlegt sein.
const ABSENDER = 'EH-Kompass Fortbildungen <fortbildungen@eh-kompass.de>';

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
  token: string
): Promise<void> {
  const link = testLink(token);
  await sendeMail(
    apiKey,
    mitarbeiter.email,
    `Zugang zur Pflicht-Fortbildung „${fobi.titel}“`,
    `<p>Hallo ${mitarbeiter.name},</p>
     <p>für dich steht die Pflicht-Fortbildung „${fobi.titel}“ an. Über den folgenden Link kommst du direkt zum Test:</p>
     <p><a href="${link}">${link}</a></p>
     <p>${fobi.beschreibung}</p>`
  );
}

export async function sendeErinnerungsMail(
  apiKey: string,
  mitarbeiter: MitarbeiterEintrag,
  fobi: Fortbildung,
  token: string
): Promise<void> {
  const link = testLink(token);
  await sendeMail(
    apiKey,
    mitarbeiter.email,
    `Erinnerung: Auffrischung der Fortbildung „${fobi.titel}“`,
    `<p>Hallo ${mitarbeiter.name},</p>
     <p>deine Pflicht-Fortbildung „${fobi.titel}“ liegt jetzt ${fobi.gueltigkeitMonate} Monate zurück und muss aufgefrischt werden.</p>
     <p>Über den folgenden Link kommst du direkt zum Test:</p>
     <p><a href="${link}">${link}</a></p>`
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

    const faelligAb = status.zuletztBestandenAm + fobi.gueltigkeitMonate * 30 * 24 * 60 * 60 * 1000;
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
