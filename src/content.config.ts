import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ratgeber = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ratgeber' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Publikations- und Aktualisierungsdatum für Stand-Angabe & SEO
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Reihenfolge im Ratgeber-Hub
    order: z.number().default(99),
    // Rechtlicher Stand + optionale Quelle für den Disclaimer
    stand: z.string().optional(),
    quelle: z.string().url().optional(),
    quelleLabel: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const glossar = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/glossar' }),
  schema: z.object({
    title: z.string(),
    // Kurz-Abkürzung/Vollbezeichnung für die Glossar-Übersicht
    term: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { ratgeber, glossar };
