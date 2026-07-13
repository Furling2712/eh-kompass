// ENTWURF: Die Formulare hier sind fachlich ungeprüfte Vorschläge (typische
// BeWo-Dokumente), keine offiziellen Vorlagen des Vereins. Vor dem produktiven
// Einsatz bitte Felder gegen die echten Abläufe/Vorgaben prüfen und anpassen.
// Weitere echte Formulare hier als weitere Einträge ergänzen - die Seite selbst
// muss dafür nicht angefasst werden.

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
    beschreibung: 'Entwurf zur Erfassung grundlegender Klientendaten – bitte fachlich prüfen.',
    felder: [
      { id: 'name', label: 'Name', typ: 'text' },
      { id: 'geburtsdatum', label: 'Geburtsdatum', typ: 'datum' },
      { id: 'ansprechpartner', label: 'Zuständiger Mitarbeiter', typ: 'text' },
      { id: 'notizen', label: 'Notizen', typ: 'textarea' },
    ],
  },
  {
    id: 'erstgespraech-protokoll',
    titel: 'Erstgespräch-Protokoll (Entwurf)',
    beschreibung:
      'Entwurf zur Dokumentation des Erstgesprächs mit einem Klienten – bitte fachlich prüfen.',
    felder: [
      { id: 'datum', label: 'Datum des Gesprächs', typ: 'datum' },
      { id: 'klient', label: 'Name Klient*in', typ: 'text' },
      { id: 'mitarbeiter', label: 'Name Mitarbeiter*in', typ: 'text' },
      { id: 'anlass', label: 'Anlass / Zuweisung', typ: 'textarea' },
      { id: 'wohnsituation', label: 'Aktuelle Wohnsituation', typ: 'textarea' },
      { id: 'anliegen', label: 'Aktuelle Problemlagen / Anliegen', typ: 'textarea' },
      { id: 'einschaetzung', label: 'Erste Einschätzung Unterstützungsbedarf', typ: 'textarea' },
      { id: 'naechste-schritte', label: 'Vereinbarte nächste Schritte', typ: 'textarea' },
    ],
  },
  {
    id: 'verlaufsdokumentation',
    titel: 'Verlaufsdokumentation (Entwurf)',
    beschreibung:
      'Entwurf zur laufenden Dokumentation eines Betreuungskontakts – bitte fachlich prüfen.',
    felder: [
      { id: 'datum', label: 'Datum', typ: 'datum' },
      { id: 'klient', label: 'Name Klient*in', typ: 'text' },
      { id: 'mitarbeiter', label: 'Name Mitarbeiter*in', typ: 'text' },
      {
        id: 'beobachtungen',
        label: 'Beobachtungen / Ereignisse seit letztem Kontakt',
        typ: 'textarea',
      },
      { id: 'zielstand', label: 'Stand der vereinbarten Ziele', typ: 'textarea' },
      { id: 'besonderheiten', label: 'Besonderheiten / Auffälligkeiten', typ: 'textarea' },
      { id: 'naechste-schritte', label: 'Nächste Schritte / Termine', typ: 'textarea' },
    ],
  },
];
