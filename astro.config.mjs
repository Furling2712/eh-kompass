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
    },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
