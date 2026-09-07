// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// Basis-URL der späteren Produktivseite. Vor dem Launch auf die echte Domain setzen.
export default defineConfig({
  site: 'https://eh-kompass.de',
  integrations: [mdx(), sitemap()],
  // Adapter für den passwortgeschützten Mitarbeiterbereich (server-seitig gerendert).
  // Die öffentlichen Seiten bleiben statisch, da `output` nicht auf 'server' gesetzt ist.
  adapter: netlify(),
  env: {
    schema: {
      STAFF_PASSWORD_HASH: envField.string({ context: 'server', access: 'secret' }),
      STAFF_SESSION_SECRET: envField.string({ context: 'server', access: 'secret' }),
      CLIENT_PASSWORD_HASH: envField.string({ context: 'server', access: 'secret' }),
      CLIENT_SESSION_SECRET: envField.string({ context: 'server', access: 'secret' }),
      // Für den Versand der Fortbildungs-Zugangslinks/-Erinnerungen, siehe src/lib/fortbildungen.ts
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret' }),
      // Admin-Bereich für die Fortbildungs-Gesamtübersicht (/mitarbeiter/fortbildungen) – eigenes
      // Passwort, bewusst getrennt von STAFF_PASSWORD_HASH (siehe src/lib/auth.ts).
      ADMIN_PASSWORD_HASH: envField.string({ context: 'server', access: 'secret' }),
      ADMIN_SESSION_SECRET: envField.string({ context: 'server', access: 'secret' }),
      // Geheimer Schlüssel für die persönlichen Status-Links der Mitarbeiter:innen
      // (/fortbildungen/status/[token]), siehe mitarbeiterStatusToken in src/lib/fortbildungen.ts.
      STATUS_LINK_SECRET: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  // tesseract.js (Bescheid-Übersetzer, /tools/bescheid-uebersetzer) wird nur per dynamischem
  // import() nachgeladen. Vite entdeckt so ein Paket erst zur Laufzeit, bündelt es dann verspätet
  // um (CommonJS -> ESM) und der erste Aufruf greift auf die noch nicht fertige/alte Bündelung zu
  // ("Failed to fetch dynamically imported module"). Explizit in optimizeDeps.include aufnehmen
  // zwingt Vite, es schon beim Serverstart vorzubündeln – behebt auch "require is not defined",
  // das sonst durch unvollständige CommonJS->ESM-Umwandlung entsteht. Betrifft nur `astro dev`,
  // im Produktions-Build (Rollup) bündelt Astro es regulär mit.
  vite: {
    optimizeDeps: {
      include: ['tesseract.js'],
    },
  },
});
