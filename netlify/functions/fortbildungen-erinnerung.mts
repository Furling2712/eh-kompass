// Netlify Scheduled Function (läuft täglich, unabhängig vom Astro-Build) – prüft fällige
// Pflicht-Fortbildungen und verschickt Erinnerungsmails samt neuem Zugangslink. Eigenständige
// Function statt Astro-API-Route, weil der Astro-Netlify-Adapter keinen `schedule`-Trigger kennt.
import type { Config } from '@netlify/functions';
import {
  ermittleFaelligeFaelle,
  markiereErinnert,
  erstelleZugang,
  sendeErinnerungsMail,
} from '../../src/lib/fortbildungen';

export default async () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY fehlt – Fortbildungs-Erinnerungen werden nicht verschickt.');
    return new Response('RESEND_API_KEY fehlt', { status: 500 });
  }

  const statusLinkSecret = process.env.STATUS_LINK_SECRET;
  if (!statusLinkSecret) {
    console.error('STATUS_LINK_SECRET fehlt – Fortbildungs-Erinnerungen werden nicht verschickt.');
    return new Response('STATUS_LINK_SECRET fehlt', { status: 500 });
  }

  const faelligeFaelle = await ermittleFaelligeFaelle();

  for (const status of faelligeFaelle) {
    try {
      const { token, mitarbeiter, fobi } = await erstelleZugang(status.mitarbeiterId, status.fobiId);
      await sendeErinnerungsMail(apiKey, mitarbeiter, fobi, token, statusLinkSecret);
      await markiereErinnert(status);
    } catch (err) {
      console.error(`Erinnerung für ${status.mitarbeiterId}/${status.fobiId} fehlgeschlagen:`, err);
    }
  }

  return new Response(`${faelligeFaelle.length} Erinnerung(en) verschickt.`);
};

export const config: Config = { schedule: '@daily' };
