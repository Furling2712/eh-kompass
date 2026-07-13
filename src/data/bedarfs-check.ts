// ENTWURF auf Basis von allgemeinem BEI_NRW-/EGH-Wissen: Die Fragen und vor
// allem die Zuordnungs-Logik unten sind fachlich UNGEPRÜFT und ersetzen keine
// Einzelfallprüfung oder Bedarfsermittlung nach BEI_NRW. Bitte vor dem
// produktiven Einsatz im Team durchgehen und an die tatsächliche Einschätzungs-
// praxis anpassen. Fragen und Logik bewusst hier ausgelagert, damit man sie
// ändern kann, ohne den Rest der Seite (Rendering, Auswertung) anzufassen.

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
  {
    id: 'kontakte',
    text: 'Wie sieht das soziale Netzwerk / die Kontakte der Person aktuell aus?',
    optionen: [
      { value: 'stabil', label: 'Stabile, tragfähige Kontakte vorhanden' },
      { value: 'wenig', label: 'Wenige, unregelmäßige Kontakte' },
      { value: 'isoliert', label: 'Kaum bis keine sozialen Kontakte, Rückzug' },
    ],
  },
  {
    id: 'krisen',
    text: 'Wie häufig kommt es zu psychischen Krisen oder akuten Verschlechterungen?',
    optionen: [
      { value: 'selten', label: 'Selten bis nie' },
      { value: 'gelegentlich', label: 'Gelegentlich' },
      { value: 'haeufig', label: 'Häufig / aktuell instabil' },
    ],
  },
  {
    id: 'organisation',
    text: 'Wie selbstständig gelingen Behördengänge, Finanzen und Termine?',
    optionen: [
      { value: 'selbststaendig', label: 'Weitgehend selbstständig' },
      { value: 'teilweise', label: 'Teilweise, mit Unterstützung' },
      { value: 'kaum', label: 'Kaum selbstständig, hoher Unterstützungsbedarf' },
    ],
  },
];

export interface Leistung {
  id: string;
  name: string;
  beschreibung: string;
  // Beispielhafte, grobe Zuordnung - keine Rechtsauskunft, keine Bedarfsermittlung.
  passtZu: (antworten: Record<string, string>) => boolean;
}

export const leistungen: Leistung[] = [
  {
    id: 'ambulant-betreutes-wohnen',
    name: 'Ambulant Betreutes Wohnen',
    beschreibung: 'Regelmäßige Unterstützung im eigenen Wohnraum.',
    passtZu: (a) =>
      a.wohnsituation !== 'stationaer' && (a.alltag !== 'keine' || a.organisation !== 'selbststaendig'),
  },
  {
    id: 'assistenz-alltag',
    name: 'Assistenzleistungen im Alltag',
    beschreibung: 'Unterstützung bei Haushalt, Einkauf, Organisation.',
    passtZu: (a) => a.alltag === 'viel' || a.organisation === 'kaum',
  },
  {
    id: 'tagesstruktur-massnahme',
    name: 'Leistungen zur Tagesstruktur',
    beschreibung: 'Angebote wie Tagesstätte, Werkstatt oder vergleichbare Maßnahmen.',
    passtZu: (a) => a.tagesstruktur !== 'ja',
  },
  {
    id: 'soziale-teilhabe',
    name: 'Leistungen zur sozialen Teilhabe',
    beschreibung: 'Kontakt- und Freizeitassistenz zum Aufbau/Erhalt sozialer Beziehungen.',
    passtZu: (a) => a.kontakte !== 'stabil',
  },
  {
    id: 'krisenbegleitung',
    name: 'Engmaschigere Begleitung / Krisenplan prüfen',
    beschreibung: 'Bei häufigen Krisen ggf. dichtere Taktung oder Krisenplan mit Klinik/Ärzten klären.',
    passtZu: (a) => a.krisen === 'haeufig',
  },
  {
    id: 'unterstuetzung-organisation',
    name: 'Unterstützung bei Finanzen/Bürokratie',
    beschreibung: 'Hilfe bei Behördengängen, Anträgen, Finanzen – ggf. rechtliche Betreuung prüfen.',
    passtZu: (a) => a.organisation === 'kaum',
  },
];
