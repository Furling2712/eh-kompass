# EH-Kompass

Ratgeber- und Tool-Website rund um die Eingliederungshilfe nach § 113 SGB IX.
Aufgebaut mit [Astro](https://astro.build/) nach der Spezifikation in [`SPEC.md`](./SPEC.md).

## Entwicklung

```bash
npm install       # Abhängigkeiten installieren
npm run dev       # Dev-Server auf http://localhost:4321
npm run build     # Produktions-Build nach dist/
npm run preview   # Build lokal ansehen
```

Node 22+ empfohlen.

## Projektstruktur

```
src/
  components/     Header, Footer, Disclaimer
  layouts/        BaseLayout (SEO/Meta), ArticleLayout
  content/
    ratgeber/     Ratgeber-Artikel (Markdown)
    glossar/      Glossar-Begriffe (Markdown)
  pages/          Seiten & Routen
    tools/        Fristenrechner, Assistenzstunden-Orientierung, Widerspruch-Generator
  styles/         global.css
  consts.ts       Seitentitel, Navigation
public/           robots.txt, favicon, statische Assets
```

Neue Artikel: einfach eine `.md`-Datei in `src/content/ratgeber/` bzw. `src/content/glossar/`
anlegen (Frontmatter-Felder siehe bestehende Dateien / `src/content.config.ts`).

## Umgesetzte Phasen (SPEC Abschnitt 8)

- [x] **Phase 0** – Astro-Setup, Deploy-Config (Netlify/Vercel), Base-Layout, Impressum/Datenschutz
- [x] **Phase 1** – Content-Grundgerüst: Ratgeber-Artikel + Glossar
- [x] **Phase 2** – Fristenrechner (mit Drei-Tages-Fiktion & Feiertagsregel je Bundesland)
- [x] **Phase 3** – Assistenzstunden-Orientierungsrechner
- [x] **Phase 4** – Muster-Widerspruch-Generator (bausteinbasiert, RDG-konform generisch)
- [x] **Phase 5** – Vorlagen-/Produktseite (Checkout-Link-Platzhalter)
- [x] **Phase 6** – Sitemap, robots.txt, Meta-/OG-Tags, kanonische URLs

## ⚠️ Vor dem Launch zu erledigen

Diese Punkte sind bewusst als Platzhalter angelegt und müssen von dir ausgefüllt/geprüft werden:

1. **`astro.config.mjs`** – `site` auf die echte Domain setzen (aktuell `https://eh-kompass.de`).
2. **`src/pages/impressum.astro`** – echte Kontakt-/Betreiberdaten eintragen (Pflicht).
3. **`src/pages/datenschutz.astro`** – an tatsächlich genutzte Dienste (Hosting, Analytics,
   AdSense, Zahlungsanbieter) anpassen.
4. **`src/pages/ueber-mich.astro`** – echte Qualifikation/Werdegang (wichtig für E-E-A-T & SEO).
5. **`src/pages/vorlagen/index.astro`** – `CHECKOUT_URL` mit Gumroad-/Lemonsqueezy-Link füllen.
6. **`public/og-default.png`** – Social-Sharing-Vorschaubild (1200×630 px) hinterlegen.
7. **`public/robots.txt`** – Sitemap-Domain anpassen, falls abweichend.
8. **Fachliche Prüfung** aller rechtlichen/inhaltlichen Aussagen (siehe SPEC Abschnitt 4 & 9).
   Insbesondere den Widerspruch-Generator vor Launch ggf. von einem Fachanwalt für Sozialrecht
   gegenlesen lassen (RDG).

## Deployment

- **Vercel:** Repo verbinden, Astro wird automatisch erkannt (kein Config nötig).
- **Netlify:** `netlify.toml` ist vorhanden (Build `npm run build`, Publish `dist`).
