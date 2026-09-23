// Tipps für den öffentlichen Navigations-Begleiter (Helper.astro). Matching-Logik und
// Typen sind gemeinsam mit dem Mitarbeiter-Helfer "Dennis" in helper-shared.ts.

import { matchHelperTip, type HelperTip } from './helper-shared';
export type { HelperTip, HelperTourStep } from './helper-shared';

export const helperTips: HelperTip[] = [
  {
    pathPrefix: '/',
    exact: true,
    message:
      'Willkommen! Wenn du gerade einen Bescheid bekommen hast und nicht weißt, was jetzt zu tun ist, schau zuerst hier vorbei.',
    links: [{ href: '/ratgeber/bescheid-erhalten-was-tun', label: 'Bescheid erhalten – was tun?' }],
    tour: [
      {
        selector: '#hero-actions',
        message:
          'Hier geht es direkt los: Ratgeber lesen, Eingliederungshilfe erklärt bekommen, oder gleich ein Tool ausprobieren.',
      },
      {
        selector: '#starter-fragen',
        message:
          'Wähl die Situation, die gerade am besten zu dir passt – jede Karte führt dich zum passenden Einstieg.',
      },
      {
        selector: '#tools-section',
        message:
          'Hier findest du kostenlose Rechner und Hilfsmittel, zum Beispiel für die Widerspruchsfrist oder einen Musterentwurf.',
      },
      {
        selector: '#trust-box',
        message: 'Und hier erfährst du, wer hinter dieser Seite steckt und warum es sie gibt.',
      },
    ],
  },

  // --- Ratgeber ---
  {
    pathPrefix: '/ratgeber',
    message: 'Hier findest du Artikel, die dir den Ablauf und deine Möglichkeiten erklären.',
    links: [
      { href: '/ratgeber/eingliederungshilfe-einfach-erklaert', label: 'Am besten hier anfangen' },
    ],
  },
  {
    pathPrefix: '/ratgeber',
    exact: true,
    message: 'Hier findest du Artikel, die dir den Ablauf und deine Möglichkeiten erklären.',
    tour: [
      {
        selector: '#ratgeber-intro',
        message:
          'Die Artikel sind in sinnvoller Reihenfolge sortiert – am besten von links nach rechts lesen, wenn du ganz neu hier bist.',
      },
      {
        selector: '#ratgeber-liste',
        message: 'Hier findest du alle Artikel auf einen Blick. Klick auf einen Titel, um ihn zu öffnen.',
      },
    ],
  },

  // --- Glossar ---
  {
    pathPrefix: '/glossar',
    message: 'Ein unbekanntes Wort gehört? Hier findest du kurze, einfache Erklärungen dazu.',
  },
  {
    pathPrefix: '/glossar',
    exact: true,
    message: 'Ein unbekanntes Wort gehört? Hier findest du kurze, einfache Erklärungen dazu.',
    tour: [
      {
        selector: '#glossar-intro',
        message: 'Ein Begriff ist unklar? Hier bekommst du kurze, verständliche Erklärungen.',
      },
      {
        selector: '#glossar-liste',
        message: 'Die Begriffe sind alphabetisch sortiert. Klick auf einen Begriff für mehr Details.',
      },
    ],
  },

  // --- Tools ---
  {
    pathPrefix: '/tools/fristenrechner',
    message: 'Trag dein Zustelldatum ein – wir errechnen dir die Frist für den Widerspruch.',
    tour: [
      {
        selector: '#frist-tool',
        message:
          'Trag dein Zustelldatum ein (oder wähl „nur Bescheiddatum bekannt“) und dein Bundesland – die Frist erscheint direkt darunter.',
      },
      {
        selector: '#frist-hinweis',
        message:
          'Wichtig: Das ist eine Orientierung, kein Rechtsgutachten. Bei knappen Fristen lieber sofort handeln.',
      },
    ],
  },
  {
    pathPrefix: '/tools/assistenzstunden-orientierung',
    message: 'Beantworte die Fragen so ehrlich wie möglich – es gibt kein richtig oder falsch.',
    tour: [
      {
        selector: '#ass-hinweis',
        message:
          'Bitte zuerst lesen: Das Tool ersetzt keine echte Bedarfsermittlung, sondern gibt nur eine grobe Orientierung.',
      },
      {
        selector: '#ass-tool',
        message:
          'Schätz für jeden Lebensbereich deinen Unterstützungsbedarf ein – das Ergebnis erscheint direkt darunter.',
      },
    ],
  },
  {
    pathPrefix: '/tools/widerspruch-generator',
    message: 'Wir setzen dir einen Entwurf zusammen, den du danach noch anpassen kannst.',
    tour: [
      {
        selector: '#wg-hinweis',
        message: 'Kein Ersatz für Rechtsberatung: Der Generator kombiniert nur allgemeine Formulierungen.',
      },
      {
        selector: '#wg-tool',
        message:
          'Füll deine Angaben aus und wähl die passenden Bausteine – daraus entsteht unten ein anpassbarer Entwurf zum Kopieren oder Herunterladen.',
      },
    ],
  },
  {
    pathPrefix: '/tools',
    message: 'Hier findest du kostenlose Rechner und Hilfsmittel für deinen Antrag.',
    tour: [
      {
        selector: '#tools-intro',
        message: 'Alle Tools laufen direkt in deinem Browser – deine Eingaben verlassen dein Gerät nicht.',
      },
      {
        selector: '#tools-liste',
        message:
          'Wähl das passende Tool: Frist berechnen, Assistenzstunden grob einschätzen oder einen Widerspruch vorbereiten.',
      },
    ],
  },

  // --- Für andere BeWo-Anbieter ---
  {
    pathPrefix: '/bewo-anbieter',
    message: 'Ein Überblick für andere BeWo-Träger: Therapiematerialien und ein Feedback-Formular.',
  },

  // --- BEI-Generierung ---
  {
    pathPrefix: '/bei-generierung/formatkonverter',
    message: 'Der Formatkonverter ist noch in Vorbereitung – bald verfügbar.',
  },
  {
    pathPrefix: '/bei-generierung/bei-formular',
    message: 'Hier beantwortest du die Fragen aus dem BEI-Formular in Ruhe online.',
  },
  {
    pathPrefix: '/bei-generierung',
    exact: true,
    message: 'Die BEI-Generierung ist bald verfügbar, sobald der Bestellprozess eingerichtet ist.',
  },

  // --- Shop ---
  {
    pathPrefix: '/shop',
    message: 'Hier findest du weiterführende Angebote.',
  },
  {
    pathPrefix: '/shop',
    exact: true,
    message: 'Hier findest du weiterführende Angebote.',
    tour: [
      {
        selector: '#shop-kategorien',
        message: 'Die Produkte sind nach Themen sortiert – klick auf einen Ordner, um die Auswahl zu sehen.',
      },
      {
        selector: '#shop-warenkorb-link',
        message: 'Hier geht\'s jederzeit zu deinem Warenkorb.',
      },
    ],
  },

  // --- Notfallzimmer ---
  {
    pathPrefix: '/notfallzimmer',
    message: 'Diese Übung führt dich Schritt für Schritt – folge einfach der Anleitung auf der Seite.',
  },
  {
    pathPrefix: '/notfallzimmer',
    exact: true,
    message: 'Werkzeuge für den Moment, wenn Anspannung oder Krise gerade sehr hoch sind.',
    tour: [
      {
        selector: '#notfallzimmer-crisis',
        message:
          'Wichtig zuerst: Bei akuter Krise wähl den Notruf oder die Telefonseelsorge – diese Übungen sind nur für den Alltag gedacht.',
      },
      {
        selector: '#notfallzimmer-kostenlos',
        message: 'Diese drei Übungen sind komplett kostenlos und ohne Anmeldung sofort nutzbar.',
      },
      {
        selector: '#notfallzimmer-premium',
        message: 'Wer mehr möchte: ausführlichere Übungen mit gesprochenem Audio zum einmaligen Freischalten.',
      },
      {
        selector: '#notfallzimmer-artikel',
        message: 'Manche Skills wirken über den Körper – zum Beispiel ein Skillball oder ein Geruchsreiz zum Bestellen.',
      },
    ],
  },

  // --- Online-BeWo ---
  {
    pathPrefix: '/online-bewo',
    message: 'Infos zur Video-Sprechstunde: Ablauf, Datenschutz und was du brauchst, um teilzunehmen.',
  },

  // --- Einfache Einzelseiten (keine Touren) ---
  {
    pathPrefix: '/datenschutz',
    message: 'Hier findest du die Datenschutzerklärung dieser Seite.',
  },
  {
    pathPrefix: '/impressum',
    message: 'Hier findest du das Impressum dieser Seite.',
  },
];

export function findHelperTip(pathname: string): HelperTip {
  return matchHelperTip(helperTips, pathname);
}
