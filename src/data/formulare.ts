// PLATZHALTER-DATEI: Aktuell nur ein Beispiel-Formular. Weitere echte Formulare
// hier als weitere Einträge ergänzen - die Seite selbst muss dafür nicht angefasst werden.

export interface Formularfeld {
  id: string;
  label: string;
  typ: 'text' | 'textarea' | 'datum';
}

export interface Formular {
  id: string;
  titel: string;
  beschreibung: string;
  felder: Formularfeld[];
}

export const formulare: Formular[] = [
  {
    id: 'stammdatenblatt',
    titel: 'Stammdatenblatt (Beispiel)',
    beschreibung: 'Platzhalter-Formular zur Erfassung grundlegender Klientendaten.',
    felder: [
      { id: 'name', label: 'Name', typ: 'text' },
      { id: 'geburtsdatum', label: 'Geburtsdatum', typ: 'datum' },
      { id: 'ansprechpartner', label: 'Zuständiger Mitarbeiter', typ: 'text' },
      { id: 'notizen', label: 'Notizen', typ: 'textarea' },
    ],
  },
];
