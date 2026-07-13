// PLATZHALTER-DATEI: Die Fragen und vor allem die Zuordnungs-Logik unten sind
// Beispiele, keine geprüfte Fachlogik. Bitte vor dem produktiven Einsatz durch
// echtes Fachwissen ersetzen/prüfen (welche Antwort führt zu welcher Leistung).
// Fragen und Logik bewusst hier ausgelagert, damit man sie ändern kann, ohne
// den Rest der Seite (Rendering, Auswertung) anzufassen.

export interface Frage {
  id: string;
  text: string;
  optionen: { value: string; label: string }[];
}

export const fragen: Frage[] = [
  {
    id: 'wohnsituation',
    text: 'Wie wohnt die Person aktuell?',
    optionen: [
      { value: 'allein', label: 'Allein, ohne Unterstützung' },
      { value: 'betreut', label: 'Im Betreuten Wohnen' },
      { value: 'familie', label: 'Bei Familie/Angehörigen' },
      { value: 'stationaer', label: 'Stationär (Wohnheim o. Ä.)' },
    ],
  },
  {
    id: 'alltag',
    text: 'Wie viel Unterstützung braucht die Person im Alltag (Haushalt, Einkaufen, Organisation)?',
    optionen: [
      { value: 'keine', label: 'Keine' },
      { value: 'wenig', label: 'Gelegentlich' },
      { value: 'viel', label: 'Regelmäßig, mehrmals pro Woche' },
    ],
  },
  {
    id: 'tagesstruktur',
    text: 'Gibt es aktuell eine Tagesstruktur (Arbeit, Werkstatt, Beschäftigung)?',
    optionen: [
      { value: 'ja', label: 'Ja, vorhanden' },
      { value: 'teilweise', label: 'Teilweise / unregelmäßig' },
      { value: 'nein', label: 'Nein' },
    ],
  },
];

export interface Leistung {
  id: string;
  name: string;
  beschreibung: string;
  // Beispielhafte, grobe Zuordnung - keine Rechtsauskunft.
  passtZu: (antworten: Record<string, string>) => boolean;
}

export const leistungen: Leistung[] = [
  {
    id: 'ambulant-betreutes-wohnen',
    name: 'Ambulant Betreutes Wohnen',
    beschreibung: 'Regelmäßige Unterstützung im eigenen Wohnraum.',
    passtZu: (a) => a.wohnsituation !== 'stationaer' && a.alltag !== 'keine',
  },
  {
    id: 'assistenz-alltag',
    name: 'Assistenzleistungen im Alltag',
    beschreibung: 'Unterstützung bei Haushalt, Einkauf, Organisation.',
    passtZu: (a) => a.alltag === 'viel',
  },
  {
    id: 'tagesstruktur-massnahme',
    name: 'Leistungen zur Tagesstruktur',
    beschreibung: 'Angebote wie Tagesstätte, Werkstatt oder vergleichbare Maßnahmen.',
    passtZu: (a) => a.tagesstruktur !== 'ja',
  },
];
