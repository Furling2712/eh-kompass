// Tipps für den Mitarbeiter-Helfer "Dennis" (unser Vereinsmaskottchen). Gilt nur für den
// internen /mitarbeiter-Bereich. Matching-Logik und Typen gemeinsam mit dem öffentlichen
// Helper in helper-shared.ts.

import { matchHelperTip, type HelperTip } from './helper-shared';

export const mitarbeiterHelperTips: HelperTip[] = [
  {
    pathPrefix: '/mitarbeiter',
    message: 'Hallo, ich bin Dennis! Frag mich, wenn du dich hier nicht zurechtfindest.',
  },
  {
    pathPrefix: '/mitarbeiter',
    exact: true,
    message: 'Willkommen im Mitarbeiterbereich! Hier findest du alles, was du für die Arbeit brauchst.',
    tour: [
      {
        selector: '#dash-systemtherapie',
        message:
          'Im Aufbau, aber schon jetzt einen Blick wert: systemtherapeutische Methoden für die Arbeit mit Klient:innen.',
      },
      {
        selector: '#dash-pflicht',
        message: 'Diese Bereiche sind für alle Mitarbeiter:innen verpflichtend – am besten zuerst durchgehen.',
      },
      {
        selector: '#dash-optional',
        message: 'Und hier gibt es Angebote zum freiwilligen Nachschlagen, wenn du sie gerade brauchst.',
      },
    ],
  },
  {
    pathPrefix: '/mitarbeiter/login',
    message: 'Hier geht\'s zum internen Bereich – deine Zugangsdaten bekommst du von der Teamleitung.',
  },
  {
    pathPrefix: '/mitarbeiter/onboarding',
    message: 'Neu im Team? Hier findest du den Einstieg: Ablauf, wichtigste Systeme, erste Schritte.',
  },
  {
    pathPrefix: '/mitarbeiter/videos',
    message: 'Kurze Videos, die dir das BEI-Verfahren Schritt für Schritt erklären.',
  },
  {
    pathPrefix: '/mitarbeiter/formulare',
    message: 'Hier füllst du gängige Formulare für die tägliche Arbeit direkt online aus und druckst sie.',
  },
  {
    pathPrefix: '/mitarbeiter/erfahrungsschatz',
    message: 'Praxiswissen und Best Practices aus dem Team – für neue und erfahrene Kolleg:innen.',
  },
  {
    pathPrefix: '/mitarbeiter/systemtherapie',
    message: 'Systemtherapeutische Ansätze für die Arbeit mit Klient:innen, inklusive Verweis auf unseren Shop.',
  },
  {
    pathPrefix: '/mitarbeiter/nextcloud',
    message: 'Hier geht\'s zum Nextcloud-Dashboard unseres IT-Kollegen.',
  },
  {
    pathPrefix: '/mitarbeiter/ncloud',
    message: 'Hier geht\'s zur nCloud (Noctron Cloud) unseres lokalen IT-Dienstleisters.',
  },
  {
    pathPrefix: '/mitarbeiter/bewo-doku',
    message: 'Kurzes Video zur Dokumentation im Betreuten Wohnen.',
  },
  {
    pathPrefix: '/mitarbeiter/handyeinrichtung',
    message: 'Schritt-für-Schritt-Anleitung, um dein Diensthandy einzurichten.',
  },
  {
    pathPrefix: '/mitarbeiter/selbstfuersorge',
    message: 'Meditative Angebote für zwischendurch im Arbeitsalltag – auch für dich als Mitarbeiter:in gedacht.',
  },
  {
    pathPrefix: '/mitarbeiter/bedarfs-check',
    message: 'Kleine Abfrage: Was steht Klient:innen zu, was können sie beantragen?',
  },
];

export function findMitarbeiterHelperTip(pathname: string): HelperTip {
  return matchHelperTip(mitarbeiterHelperTips, pathname);
}
