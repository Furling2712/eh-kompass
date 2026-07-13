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

const onboarding = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/onboarding' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Reihenfolge im Onboarding-Ablauf
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(99),
    // Solange kein Video existiert, leer lassen -> Seite zeigt "Video folgt in Kürze"
    videoUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

const erfahrungsschatz = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/erfahrungsschatz' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

const selbstfuersorge = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/selbstfuersorge' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(99),
    // Solange keine Aufnahme existiert, leer lassen -> Seite zeigt "Aufnahme folgt in Kürze"
    audioUrl: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  ratgeber,
  glossar,
  onboarding,
  videos,
  erfahrungsschatz,
  selbstfuersorge,
};
