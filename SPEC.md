# EH-Kompass — Produktspezifikation & Build-Roadmap

> Arbeitstitel. Ratgeber- und Tool-Website rund um Eingliederungshilfe nach § 113 SGB IX,
> aufgebaut auf echter Praxiserfahrung aus dem psychiatrischen Betreuten Wohnen (HEP, BEI_NRW/PerSEH-Erfahrung).
> Diese Datei ist als Projekt-Briefing für Claude Code gedacht — Abschnitt 8 enthält die Build-Reihenfolge.

## 1. Ziel & Nicht-Ziele

**Ziel:** Eine automatisierbare, größtenteils passive Einnahmequelle neben dem Hauptjob als HEP —
Content- und Tool-Website, monetarisiert über Werbung, Affiliate und einmalige Digitalprodukt-Verkäufe.

**Explizit nicht Ziel (aus vorherigen Überlegungen verworfen):**
- Keine Integration in PerSEH oder andere Systeme Dritter (Datenschutz-/Haftungsrisiko, keine offizielle Schnittstelle)
- Kein B2B-SaaS für andere Träger (zu viel Vertrieb/Support/Compliance-Aufwand neben Vollzeitjob)
- Keine individuelle Rechtsberatung — nur generische Informationen/Vorlagen (siehe Abschnitt 4)

## 2. Zielgruppe

1. Menschen mit psychischer Erkrankung/Behinderung mit Eingliederungshilfe-Anspruch oder -Bescheid
2. Angehörige, die den Bescheid/Prozess nicht verstehen
3. Sekundär: neue Fachkräfte in der Eingliederungshilfe (Berufseinsteiger, Quereinsteiger)

**Differenzierung:** Praktiker-Perspektive (echte BEI/ICF/Hilfeplan-Erfahrung) statt generischer
Rechtsblog-Texte wie bei bestehenden Seiten (assistenzplus.de, ksl-nrw.de, betanet.de).

## 3. Tech-Stack-Empfehlung

| Bereich | Empfehlung | Begründung |
|---|---|---|
| Framework | Astro (Content Islands, MDX) | Sehr SEO-/Performance-freundlich, Markdown-Content direkt im Repo, interaktive Tools nur dort wo nötig als React/Vanilla-JS-Island |
| Hosting | Vercel oder Netlify (Free Tier) | Kostenlos für den Start, automatisches Deployment aus Git |
| Interaktive Tools | Client-seitiges JS, keine Server-Persistenz | Keine Nutzerdaten-Speicherung nötig → datenschutzfreundlich, kein Server-Backend nötig (gilt weiterhin für alle öffentlichen Seiten, siehe Abschnitt 11) |
| Werbung | Google AdSense (später ggf. Ezoic ab genug Traffic) | Standard-Einstieg, Ezoic/Mediavine erst ab relevantem Traffic sinnvoll |
| Digitalprodukte | Lemonsqueezy oder Gumroad (Checkout-Link/Embed) | Kein eigenes Payment-System nötig, automatisierter Verkauf |
| Analytics | Plausible oder Simple Analytics | DSGVO-freundlich, kein Cookie-Banner-Zwang (im Gegensatz zu Google Analytics) |
| Content-Verwaltung | Markdown/MDX-Dateien im Repo | Kein Headless CMS nötig für den Start, versionierbar mit Git |

## 4. Rechtlicher Rahmen (wichtig — bitte ernst nehmen)

- **Kein Ersatz für Rechtsberatung:** Jede Seite mit rechtlichen Inhalten braucht einen klaren, sichtbaren
  Disclaimer + Stand-Datum + Quellenangabe zum Gesetzestext.
- **Muster-Widerspruch-Generator bewusst generisch halten:** Der Generator soll Textbausteine kombinieren
  (wie ein Ratgeberbuch), aber keine individuelle Erfolgsprognose oder rechtliche Bewertung des Einzelfalls
  abgeben. Sonst besteht das Risiko, unter das Rechtsdienstleistungsgesetz (RDG) zu fallen. Im Zweifel vor
  Launch von einem Fachanwalt für Sozialrecht kurz gegenlesen lassen (einmalige Ausgabe, kein Blocker für den Start).
- **Impressum & Datenschutzerklärung** sind Pflicht, auch für eine kleine private Seite.
- Alle fachlichen/rechtlichen Inhalte müssen von dir inhaltlich geprüft werden — Claude liefert Struktur,
  Text-Rohfassungen und Code, aber keine rechtssichere Endkontrolle.

## 5. Informationsarchitektur (Sitemap)

```
/                              Startseite
/ratgeber/                     Artikel-Hub
/ratgeber/eingliederungshilfe-grundlagen
/ratgeber/bescheid-erhalten-was-tun
/ratgeber/bei-nrw-erklaert
/ratgeber/psychische-erkrankung-eingliederungshilfe
/ratgeber/bedarfsermittlung-bundeslaender-vergleich
/glossar/                      Glossar-Hub (einzelne Begriffe als Unterseiten, gut für Long-Tail-SEO)
/tools/                        Tool-Hub
/tools/widerspruch-generator
/tools/fristenrechner
/tools/assistenzstunden-orientierung
/bei-generierung/              Produktseite (BEI-Generierung für BeWo-Anbieter, kostenpflichtig)
/ueber-mich                    Trust-/E-E-A-T-Seite (echte Qualifikation zeigen)
/impressum
/datenschutz
```

## 6. Priorisierte erste Inhalte/Tools

| # | Inhalt | Typ | Aufwand | Monetarisierung |
|---|---|---|---|---|
| 1 | Fristenrechner (Widerspruchsfrist ab Zustelldatum) | Mini-Tool | S | Ads |
| 2 | "Bescheid bekommen – Checkliste in 5 Schritten" | Artikel + PDF-Freebie | S | E-Mail-Capture, Ads |
| 3 | Über mich / Warum diese Seite | Trust-Seite | S | Conversion-Booster |
| 4 | Eingliederungshilfe beantragen – Schritt für Schritt | Pillar-Artikel | M | SEO-Anker, Ads |
| 5 | Glossar: ICF, BEI, Regelbedarf & Co. (10–15 Einträge) | Artikel-Serie | M | Long-Tail-SEO, Ads |
| 6 | BEI_NRW erklärt (Ablauf, was Betroffene erwartet) | Artikel | M | SEO, Autorität |
| 7 | Assistenzstunden-Orientierungsrechner | Tool | M | Ads |
| 8 | Muster-Widerspruch-Generator | Tool | L | Ads, später Anwalt-Leadgen |
| 9 | Vorlagen-Paket "Hilfeplan-Vorbereitung" | Digitalprodukt | M | Direktverkauf |
| 10 | Vergleich Bedarfsermittlungsinstrumente je Bundesland | Artikel | M | SEO/Autorität |

Reihenfolge nach Aufwand/Nutzen: erst die S-Punkte (1, 2, 3), dann Pillar-Content (4, 5),
dann die komplexeren Tools (7, 8) und zuletzt das Digitalprodukt (9).

## 7. Monetarisierungs-Setup-Checkliste

- [ ] Impressum & Datenschutzerklärung fertig, bevor irgendein Traffic kommt
- [ ] Mindestens 15–20 Seiten Original-Content vor AdSense-Antrag
- [ ] AdSense-Antrag stellen
- [ ] Lemonsqueezy/Gumroad-Account für Vorlagen-Paket einrichten
- [ ] Später: Kontakt zu 2–3 Fachanwälten für Sozialrecht für Leadgen-Kooperation

## 8. Build-Reihenfolge für Claude Code

**Phase 0 — Projekt-Setup**
Astro-Projekt aufsetzen, Deployment-Pipeline (Vercel/Netlify), Basis-Layout, Impressum-/Datenschutz-Templates.

**Phase 1 — Content-Grundgerüst**
Reine Content-Seiten ohne komplexe Logik: Punkte 2, 3, 4, 5, 6 aus Abschnitt 6.

**Phase 2 — Erstes Tool**
Fristenrechner (Punkt 1) — einfachste Logik, guter Testfall für den Tool-Baukasten.

**Phase 3 — Assistenzstunden-Orientierungsrechner** (Punkt 7)

**Phase 4 — Muster-Widerspruch-Generator** (Punkt 8, komplexestes Tool)

**Phase 5 — Digitalprodukt-Integration**
Vorlagen-Paket + Lemonsqueezy/Gumroad-Checkout (Punkt 9).

**Phase 6 — SEO-Feinschliff & Monetarisierung**
Sitemap.xml, robots.txt, Meta-Tags, strukturierte Daten (Schema.org), AdSense-Integration.

## 9. Was du selbst noch liefern musst

- Fachliche Prüfung aller rechtlichen/inhaltlichen Aussagen vor Veröffentlichung
- Reale (anonymisierte!) Praxisbeispiele/Formulierungen für Glossar und Artikel — das ist dein
  eigentlicher Wettbewerbsvorteil gegenüber bestehenden Seiten
- Ggf. Rückfrage bei Fachanwalt zum Widerspruch-Generator vor Launch

## 10. Erste Schritte

1. Diese Datei (`SPEC.md`) ins Projektverzeichnis legen
2. Mit Claude Code öffnen und z. B. starten mit: *"Setze Phase 0 aus SPEC.md um: Astro-Projekt,
   Deployment-Pipeline, Basis-Layout."*
3. Domain registrieren, Vercel/Netlify verbinden
4. Phase für Phase abarbeiten (Abschnitt 8)

## 11. Architektur-Update: Mitarbeiterbereich (Juli 2026)

Diese Datei ging ursprünglich davon aus, dass die gesamte Seite backend-frei bleibt (siehe Abschnitt 3
und 1). Das gilt weiterhin uneingeschränkt für alle **öffentlichen** Seiten (Ratgeber, Glossar, Tools,
Vorlagen etc.) — sie bleiben vollständig statisch vorgerendert, speichern keine Nutzerdaten und
brauchen keinen Server.

Neu dazugekommen ist ein **interner, passwortgeschützter Mitarbeiterbereich** unter `/mitarbeiter/*`
für Kollegen im Verein — ein bewusster, punktueller Ausnahmefall vom „kein Backend"-Grundsatz, nicht
dessen Aufgabe:

- Ermöglicht durch den `@astrojs/netlify`-Adapter; `output` bleibt `static`, nur die `/mitarbeiter/*`-Seiten
  setzen einzeln `export const prerender = false`.
- Login: ein gemeinsames Passwort für alle Mitarbeiter (kein Einzel-Account-System), gehasht (scrypt) in
  einer Umgebungsvariable gespeichert. Sitzung: signierter, zustandsloser Cookie (HMAC) — keine Datenbank,
  kein externer Auth-Anbieter.
- **Phase 0 (aktuell umgesetzt):** nur das technische Grundgerüst — Login, Logout, geschützte
  Platzhalter-Startseite. Die eigentlichen Inhalte (Onboarding-Hub, Formular-Erstellung,
  BEI-Erklärvideos, Bedarfs-Check-Abfrage) sind bewusst noch nicht gebaut, das ist die nächste Phase.
- **Online-BeWo (separates, späteres Vorhaben):** ein perspektivisch monetarisierter, klientenseitiger
  Bereich mit echten Nutzerdaten (Dokumente bearbeiten, Einzel-Accounts) wurde bei der Architektur
  mitgedacht, aber bewusst **nicht jetzt** umgesetzt. Dafür braucht es dann eine echte Datenbank/einen
  echten Auth-Anbieter (z. B. Supabase) sowie eine gesonderte Prüfung der Sozialgeheimnis-/SGB-Pflichten —
  diese Entscheidung sollte erst getroffen werden, wenn Online-BeWo konkret angegangen wird, nicht vorher.
