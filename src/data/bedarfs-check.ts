// ENTWURF auf Basis von allgemeinem BEI_NRW-/EGH-Wissen und einer Internet-
// recherche (Stand 2026) zu SGB II/SGB XII/SGB III-Leistungen: Die Fragen und
// vor allem die Zuordnungs-Logik unten sind fachlich UNGEPRÜFT und ersetzen
// keine Einzelfallprüfung, keine Bedarfsermittlung nach BEI_NRW und keine
// Rechtsberatung. Euro-Beträge und Prozentsätze ändern sich regelmäßig -
// im Zweifel immer beim zuständigen Amt/Jobcenter nachfragen. Bitte vor dem
// produktiven Einsatz im Team durchgehen und an die tatsächliche Einschätzungs-
// praxis anpassen. Fragen und Logik bewusst hier ausgelagert, damit man sie
// ändern kann, ohne den Rest der Seite (Rendering, Auswertung) anzufassen.

export interface Frage {
  id: string;
  text: string;
  optionen: { value: string; label: string }[];
  // Für die Gruppierung in der UI - rein optisch, keine fachliche Bedeutung.
  kategorie?: 'betreuung' | 'leistungen';
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
  {
    id: 'haushalt',
    text: 'Lebt die Person mit minderjährigen Kindern zusammen?',
    kategorie: 'leistungen',
    optionen: [
      { value: 'nein', label: 'Nein, keine Kinder im Haushalt' },
      { value: 'alleinerziehend', label: 'Ja, alleinerziehend (keine Partnerschaft)' },
      { value: 'mit-partner', label: 'Ja, mit Partner/in zusammen' },
    ],
  },
  {
    id: 'einkommen',
    text: 'Welche Haupteinkommensquelle hat die Person aktuell?',
    kategorie: 'leistungen',
    optionen: [
      { value: 'buergergeld-grundsicherung', label: 'Bürgergeld / Grundsicherung' },
      { value: 'erwerbstaetigkeit', label: 'Erwerbstätigkeit (Lohn/Gehalt)' },
      { value: 'erwerbsminderungsrente', label: 'Erwerbsminderungsrente' },
      { value: 'ausbildungsverguetung', label: 'Ausbildungsvergütung / Bildungsmaßnahme' },
      { value: 'unklar', label: 'Unklar / weiß ich nicht' },
    ],
  },
  {
    id: 'schwerbehindertenausweis',
    text: 'Gibt es einen Schwerbehindertenausweis (GdB mind. 50)?',
    kategorie: 'leistungen',
    optionen: [
      { value: 'ja', label: 'Ja, vorhanden' },
      { value: 'nein', label: 'Nein' },
      { value: 'unbekannt', label: 'Unbekannt / noch nie beantragt' },
    ],
  },
  {
    id: 'pflegebedarf',
    text: 'Gibt es neben der Eingliederungshilfe einen spürbaren Hilfebedarf im Alltag (Körperpflege, Erinnerung an Medikamente/Termine, Sturzrisiko, zeitliche/örtliche Orientierung)?',
    kategorie: 'leistungen',
    optionen: [
      { value: 'deutlich', label: 'Ja, deutlich' },
      { value: 'etwas', label: 'Etwas' },
      { value: 'nein', label: 'Nein' },
    ],
  },
  {
    id: 'ausbildung',
    text: 'Befindet sich die Person aktuell in einer Berufsausbildung oder vergleichbaren Bildungsmaßnahme?',
    kategorie: 'leistungen',
    optionen: [
      { value: 'betriebliche-ausbildung', label: 'Betriebliche/außerbetriebliche Ausbildung' },
      { value: 'wfbm-bbw', label: 'Maßnahme in WfbM/Berufsbildungswerk' },
      { value: 'nein', label: 'Nein / nicht zutreffend' },
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
  {
    id: 'mehrbedarf-behinderung',
    name: 'Mehrbedarf für Menschen mit Behinderung prüfen (§ 21 Abs. 4 SGB II / § 30 SGB XII)',
    beschreibung:
      'Bei Bezug von Bürgergeld/Grundsicherung und laufender Eingliederungshilfe sind oft zusätzlich 35 % des Regelbedarfs möglich (Stand 2026, ca. 197 €) – muss aktiv beim Jobcenter/Sozialamt beantragt werden, wird nicht automatisch gezahlt.',
    passtZu: (a) => a.einkommen === 'buergergeld-grundsicherung',
  },
  {
    id: 'wohngeld',
    name: 'Wohngeld prüfen',
    beschreibung:
      'Kommt vor allem infrage, wenn kein Bürgergeld/keine Grundsicherung bezogen wird (z. B. bei Erwerbstätigkeit oder Erwerbsminderungsrente) und die Wohnkosten sonst nicht gedeckt sind – bei Transferleistungsbezug meist ausgeschlossen, da die Unterkunftskosten dort schon enthalten sind.',
    passtZu: (a) => a.einkommen === 'erwerbstaetigkeit' || a.einkommen === 'erwerbsminderungsrente',
  },
  {
    id: 'mehrbedarf-alleinerziehend',
    name: 'Mehrbedarf für Alleinerziehende prüfen (§ 21 Abs. 3 SGB II / § 30 Abs. 3 SGB XII)',
    beschreibung: 'Je nach Anzahl und Alter der Kinder zusätzlich ca. 12–60 % des Regelbedarfs möglich.',
    passtZu: (a) => a.haushalt === 'alleinerziehend',
  },
  {
    id: 'pflegegrad',
    name: 'Pflegegrad-Antrag prüfen',
    beschreibung:
      'Auch bei rein psychischer Erkrankung möglich (Begutachtung berücksichtigt u. a. kognitive und psychische Aspekte) – entscheidend ist der tatsächliche Hilfebedarf im Alltag, nicht allein die Diagnose.',
    passtZu: (a) => a.pflegebedarf === 'deutlich',
  },
  {
    id: 'schwerbehindertenausweis-beantragen',
    name: 'Schwerbehindertenausweis beantragen/prüfen',
    beschreibung:
      'Ab einem GdB von 50 möglich, auch bei psychischen Erkrankungen mit erheblicher Teilhabebeeinträchtigung von mind. 6 Monaten. Bringt Nachteilsausgleiche wie Steuerfreibetrag, ggf. erhöhtes Wohngeld oder Rundfunkbeitragsermäßigung, je nach zuerkanntem Merkzeichen.',
    passtZu: (a) => a.schwerbehindertenausweis === 'nein' || a.schwerbehindertenausweis === 'unbekannt',
  },
  {
    id: 'bab',
    name: 'Berufsausbildungsbeihilfe (BAB) prüfen',
    beschreibung:
      'Für Azubis in betrieblicher/außerbetrieblicher Ausbildung, die nicht bei den Eltern wohnen können und deren Ausbildungsvergütung (plus Elterneinkommen) nicht für den Lebensunterhalt reicht.',
    passtZu: (a) => a.ausbildung === 'betriebliche-ausbildung',
  },
  {
    id: 'ausbildungsgeld',
    name: 'Ausbildungsgeld prüfen',
    beschreibung:
      'Leistung der Agentur für Arbeit für Menschen mit Behinderung in Maßnahmen wie dem WfbM-Berufsbildungsbereich oder einem Berufsbildungswerk – tritt an die Stelle von BAB.',
    passtZu: (a) => a.ausbildung === 'wfbm-bbw',
  },
];
