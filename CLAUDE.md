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

## Interne Notizen
Dieses Repo ist **public**. Sicherheitslücken, DSGVO-/Incident-Details, Kosten-/Marktzahlen und
sonstige nicht-öffentliche Projektnotizen stehen in `CLAUDE.local.md` (git-ignored, nicht gepusht,
nur lokal auf diesem Rechner). Beide Dateien immer zusammen lesen für den vollen Kontext.

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
