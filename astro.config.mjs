// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Basis-URL der späteren Produktivseite. Vor dem Launch auf die echte Domain setzen.
export default defineConfig({
  site: 'https://eh-kompass.de',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
