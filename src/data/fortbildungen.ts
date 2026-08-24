// Pflicht-Fortbildungen: Titel, Gültigkeitsdauer und Testfragen.
// Neue Fortbildung = neuer Eintrag hier. WICHTIG: `fragen` (inkl. `richtigIndex`) wird nur
// serverseitig verwendet (Test-Rendering ohne Lösung, Auswertung in src/lib/fortbildungen.ts) –
// nie direkt an den Client schicken, sonst stehen die Lösungen im Seitenquelltext.

export interface FortbildungsFrage {
  frage: string;
  antworten: string[];
  richtigIndex: number;
}

export interface Fortbildung {
  id: string;
  titel: string;
  beschreibung: string;
  /** Nach wie vielen Monaten die Fortbildung erneut fällig wird. */
  gueltigkeitMonate: number;
  /** Mindestanteil richtiger Antworten zum Bestehen, in Prozent. */
  bestehensgrenzeProzent: number;
  fragen: FortbildungsFrage[];
}

export const fortbildungen: Fortbildung[] = [
  {
    id: 'brandschutz',
    titel: 'Brandschutz-Unterweisung',
    beschreibung:
      'Jährliche Pflichtunterweisung zu Verhalten im Brandfall, Fluchtwegen und Feuerlöschern.',
    gueltigkeitMonate: 12,
    bestehensgrenzeProzent: 80,
    fragen: [
      {
        frage: 'Was ist im Brandfall zuerst zu tun?',
        antworten: [
          'Ruhe bewahren und Kolleg:innen warnen',
          'Persönliche Gegenstände retten',
          'Den Brand selbst löschen, egal wie groß',
        ],
        richtigIndex: 0,
      },
      {
        frage: 'Wie verhält man sich bei starker Rauchentwicklung im Flur?',
        antworten: [
          'Aufrecht durch den Rauch gehen, um schneller voranzukommen',
          'Möglichst tief bleiben und an der Wand entlang zum Notausgang',
          'Aufzug nutzen, um schneller nach unten zu kommen',
        ],
        richtigIndex: 1,
      },
      // TODO: echte Fragen aus der tatsächlichen Unterweisung ergänzen
    ],
  },
  // TODO: weitere Pflicht-Fortbildungen eintragen
];
