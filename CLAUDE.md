# EH-Kompass — Projektnotizen für Claude

## Status (21.07.2026)
Laut Alex ist die Seite in ihrem aktuellen Zustand **noch eine Totalkatastrophe** und muss bis
zum Release **STARK überarbeitet werden**. Nicht als fertig oder launch-nah behandeln, auch wenn
README.md Phase 0–6 als "erledigt" listet — der Haken bezieht sich auf technische Grundfunktion,
nicht auf Qualität/Reife.

## Projekt-Kontext
- Läuft über die gGmbH von Alex' Arbeitgeber, nicht als privates Nebenprojekt. Rechtsberatung,
  Gewerbeanmeldung, RDG-Prüfung etc. laufen intern über die gGmbH — bei Kostenfragen nicht mehr
  als externe Posten einkalkulieren.
- Geografischer Fokus: NRW, speziell der Zuständigkeitsbereich des Landschaftsverbands Rheinland
  (LVR). Nicht bundesweit denken. BEI_NRW ist zwar landesweit einheitlich (LVR + LWL gemeinsam
  entwickelt), aber Verfahren/Zuständigkeiten/Ansprechpartner unterscheiden sich je nach
  Landesteil — Inhalte entsprechend auf LVR-Rheinland zuschneiden statt pauschal "NRW" oder
  "bundesweit" zu behaupten.
- Siehe SPEC.md für die ursprüngliche Produktspezifikation und Build-Reihenfolge (dort teils noch
  mit bundesweitem/privatem Rahmen formuliert — bei Widersprüchen gilt diese Datei).

## Bisherige Analyse
`EH-Kompass_Kosten_Markt_Marketing.docx` (Projektordner) enthält Kosten-, Markt- und
Marketinganalyse Stand 21.07.2026 — als Ausgangspunkt nutzen, nicht als abgeschlossen betrachten.

## Offene Baustellen aus Code-Review (21.07.2026)
Bei einer ersten Durchsicht des Codes aufgefallen, noch nicht angegangen:
- Online-BeWo (`/online-bewo`) nutzt einen geteilten Zugangscode für alle Klient:innen (gleiches
  Muster wie Mitarbeiter-Login, `src/lib/auth.ts`) — kein individueller Zugriff/Widerruf/Audit-Trail.
  Bei Klientendaten (Sozialgeheimnis) vor echtem Einsatz klären.
- WebRTC-Signaling-Räume (`src/pages/online-bewo/api/signal.ts`, Netlify Blobs) haben kein
  TTL-Cleanup — verwaiste Räume bei Verbindungsabbruch möglich.
- `/mitarbeiter/ncloud` und `/mitarbeiter/nextcloud` sind zwei fast identische unfertige
  Platzhalter-Seiten, aber **keine** Duplikate: nCloud (Noctron Cloud) ist die Cloud des lokalen
  IT-Dienstleisters, nextcloud ist eine separate Linux-Nextcloud-Instanz eines IT-Kollegen. Nicht
  konsolidieren — beide brauchen eine eigene, echte Anbindung an ihr jeweiliges Backend.
- Git-Historie: wenige, sehr große Sammel-Commits; aktuell viele uncommittete Änderungen. Ab jetzt
  kleinteiliger committen.
- README.md/SPEC.md sind veraltet ggü. dem tatsächlichen Funktionsumfang (Shop mit Warenkorb,
  Notfallzimmer, Selbstfürsorge, Systemtherapie, Online-BeWo, Formulare, Bedarfs-Check,
  Erfahrungsschatz, Handyeinrichtung existieren bereits, sind dort aber nicht dokumentiert).
- `BaseLayout.astro` verlinkt standardmäßig auf `/og-default.png`, Datei fehlt in `public/` —
  kaputte Social-Preview auf allen Seiten ohne explizites Bild.
- Nur 4 Ratgeber-Artikel / 7 Glossar-Einträge — SPEC.md nennt 15–20 Seiten als Ziel vor
  AdSense-Antrag.

## Pflicht-Fortbildungen mit Test + Jahres-Erinnerung (Stand 27.08.2026)
Funktion im Mitarbeiterbereich: `/mitarbeiter/fortbildungen` (Admin-Gesamtübersicht +
Zugangslink-Versand) und `/fortbildungen/test/[token]` (Wissenstest, läuft bewusst getrennt vom
normalen Mitarbeiter-Login über einen personalisierten Magic-Link-Token). Nachweise landen in
Netlify Blobs (Store `fortbildungen`, siehe `src/lib/fortbildungen.ts`), eine tägliche Netlify
Scheduled Function (`netlify/functions/fortbildungen-erinnerung.mts`) verschickt automatisch eine
Erinnerungsmail, sobald eine Fortbildung >12 Monate (konfigurierbar pro Fortbildung) zurückliegt.
Mailversand über Resend. `src/data/fortbildungen.ts` ist mit 3 echten Fortbildungen befüllt
(Datenschutzunterweisung, Arbeitssicherheit, KI-Schulung, je 10 Fragen).

**Admin/Mitarbeiter-Trennung (27.08., DSGVO-Fix):** Die Gesamtübersicht unter
`/mitarbeiter/fortbildungen` zeigte bis eben den Fortbildungsstand ALLER Mitarbeiter:innen für
jede Person mit dem geteilten Mitarbeiter-Passwort sichtbar — personenbezogene Daten, kein
Need-to-know. Jetzt eigenes Admin-Passwort (`ADMIN_PASSWORD_HASH`/`ADMIN_SESSION_SECRET`,
`src/lib/auth.ts`, eigene Middleware-Route in `src/middleware.ts`, Login unter
`/mitarbeiter/fortbildungen/login`), komplett getrennt vom normalen Mitarbeiter-Login. Für den
eigenen Stand gibt es stattdessen einen persönlichen, tokenbasierten Link
(`/fortbildungen/status/[token]`, `STATUS_LINK_SECRET`, deterministisch per HMAC aus der
Mitarbeiter-ID abgeleitet, kein Login nötig) — kommt automatisch mit jeder Zugangs-/Erinnerungsmail
und ist zusätzlich in der Admin-Übersicht zum manuellen Weitergeben gelistet. Admin-Passwort wurde
automatisch generiert und Alex im Chat mitgeteilt; kann jederzeit mit `npm run admin:hash` neu
gesetzt werden.

**Fälligkeits-Bug behoben (27.08.):** Die Fälligkeitsberechnung rechnete mit `gueltigkeitMonate *
30 Tagen` statt echten Kalendermonaten — bei 12 Monaten Gültigkeit wurde jede Fortbildung ca. 5
Tage zu früh fällig (360 statt ~365 Tage). Jetzt zentral in `faelligkeitsDatum()`
(`src/lib/fortbildungen.ts`, nutzt `Date.setMonth`), an beiden Stellen (Admin-Übersicht,
Erinnerungs-Function) verwendet statt dupliziert.

**Vor dem echten Einsatz noch offen (kann ich nicht für Alex erledigen):**
- Resend-Account anlegen, Domain `eh-kompass.de` per DNS verifizieren, `RESEND_API_KEY` in den
  Netlify-Site-Settings + lokal in `.env` hinterlegen (Stand 26.08.: `.env` enthielt weiterhin nur
  einen Platzhalter, echter Versand schlug mit 401 "API key is invalid" fehl). Als Übergangslösung
  läuft `ABSENDER` in `src/lib/fortbildungen.ts` aktuell auf Resends Testdomain
  `onboarding@resend.dev` statt `fortbildungen@eh-kompass.de` — funktioniert ohne DNS-Verifizierung,
  liefert aber nur an die Mailadresse des Resend-Account-Inhabers (alexander.radler@ptv-euregio.de)
  aus. Sobald ein echter `RESEND_API_KEY` gesetzt UND die Domain verifiziert ist: `ABSENDER` zurück
  auf `fortbildungen@eh-kompass.de` stellen.
- `src/data/mitarbeiter.ts` mit echten Namen/Mailadressen der Kolleg:innen befüllen (aktuell nur
  Alex selbst eingetragen)
- Vor Deploy: `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`, `STATUS_LINK_SECRET` (zusätzlich zu
  den bestehenden Secrets) auch in den Netlify-Site-Settings hinterlegen, nicht nur lokal in `.env`
- Nach dem ersten Deploy prüfen, ob die Scheduled Function in Netlify als "Scheduled" gelistet ist

## Laufendes Thema: Neue Shop-Produkte aus der Schreinerei (Stand 21.07.2026)
Die gGmbH hat eine Schreinerei, die Menschen mit psychischen Einschränkungen beschäftigt (stellt
u. a. das bestehende "Aufstellungsbrett" her, `src/data/shop-produkte.ts`). Alex möchte weitere,
mit einfacher Schreinerei umsetzbare Therapie-/Skill-Produkte für den Shop entwickeln.

Bereits recherchierte Ideen (siehe Chat-Verlauf für Details/Begründung je Methode):
1. Ersatzfiguren-/Zusatzsets zum bestehenden Aufstellungsbrett (Vorbild: Manufaktur Bethel,
   eigene Werkstatt-Marke der Stiftung Bethel — verkauft genau dieses Segment: Familienbrett 45 €,
   Ersatzfiguren-Set 25 €, Einzelfiguren ab 2 €. Guter Preisanker.)
2. Sandspiel-Kiste (Sandtray-Therapie nach Dora Kalff) — blau lackierter Boden, ca. 50×70×7 cm
3. Bodenanker-Set aus Holz (systemisches Coaching/NLP) — bisher meist Filz/Pappe, Holz wäre Nische
4. Krisenbox/Notfallkoffer aus Holz für die bestehenden Skill-Produkte (DBT-Notfallkoffer-Prinzip)
5. Erdungswürfel mit eingravierter 5-4-3-2-1-Übung — physisches Pendant zu
   `src/pages/notfallzimmer/erdung-54321.astro`, guter Cross-Link Content↔Shop
6. Genogramm-Symbolset (systemische Familientherapie), nutzt gleiche Drechsel-Skills wie Figuren
7. Tastbrett für Snoezelen/Basale Stimulation (unterschiedliche Holzoberflächen)
8. Ressourcen-/Schatzkiste für Traumaarbeit/Trauerbegleitung, personalisierbar per Gravur

**Nächster Schritt (mit Alex verabredet):** Für ein bis zwei der Ideen oben Produkttexte im Format
von `src/data/shop-produkte.ts` entwerfen (id, name, beschreibung, details[], preis, bild,
kategorie, kategorieSlug, lieferzeit, anbieter — Vorbild: bestehender Eintrag "aufstellungsbrett").
Noch offen: welche Ideen Alex priorisiert, Bildmaterial fehlt noch (Platzhalter nötig).
