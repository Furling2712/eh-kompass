// Feste Begriffs-/Phrasen-Datenbank für den Bescheid-Übersetzer (/tools/bescheid-uebersetzer).
// Bewusst kein Sprachmodell: der erkannte Text wird nur gegen diese Liste gematcht. Kein Server,
// keine Kosten, keine Klientendaten verlassen den Browser. Deckt nur bekannte Standardformulierungen
// ab, keinen beliebigen Freitext – das ist Absicht, siehe CLAUDE.md.
//
// `muster` sind RegExp, die im erkannten Text gesucht werden. Kurze Abkürzungen (BEI, ICF, BTHG,
// EUTB) bewusst case-sensitive mit \b-Wortgrenzen, sonst matcht z. B. "BEI" ständig auf das ganz
// normale Wort "bei". Längere, eindeutige Formulierungen laufen case-insensitive.

export interface BescheidBegriff {
  id: string;
  begriff: string;
  erklaerung: string;
  muster: RegExp[];
  mehr?: { href: string; label: string };
}

export const bescheidBegriffe: BescheidBegriff[] = [
  {
    id: 'rechtsbehelfsbelehrung',
    begriff: 'Rechtsbehelfsbelehrung',
    erklaerung:
      'Der Abschnitt, der dir sagt, ob und wie du gegen die Entscheidung vorgehen kannst – meist am Ende des Bescheids. Dort steht, bei welcher Stelle du innerhalb welcher Frist Widerspruch einlegen kannst.',
    muster: [/rechtsbehelfsbelehrung/i],
  },
  {
    id: 'widerspruchsfrist',
    begriff: 'Widerspruchsfrist',
    erklaerung:
      'Die Zeit, die du hast, um gegen den Bescheid vorzugehen – in der Regel ein Monat ab Zustellung.',
    muster: [/widerspruchsfrist/i],
    mehr: { href: '/tools/fristenrechner', label: 'Frist genau berechnen' },
  },
  {
    id: 'widerspruch',
    begriff: 'Widerspruch',
    erklaerung:
      'Damit forderst du, dass die Entscheidung noch einmal geprüft wird. Das ist erst mal nichts Dramatisches – nur ein formaler Antrag auf Überprüfung, den du meist schriftlich einreichst.',
    muster: [/widerspruch\s*(einlegen|eingelegt|gegen diesen bescheid)/i],
    mehr: { href: '/tools/widerspruch-generator', label: 'Zum Muster-Widerspruch-Generator' },
  },
  {
    id: 'anhoerung',
    begriff: 'Anhörung',
    erklaerung:
      'Bevor eine Behörde eine für dich nachteilige Entscheidung trifft, muss sie dir vorher meist Gelegenheit geben, dazu Stellung zu nehmen (§ 24 SGB X). Das ist dieser Schritt.',
    muster: [/anhörung/i, /gelegenheit zur stellungnahme/i],
  },
  {
    id: 'mitwirkung',
    begriff: 'Mitwirkungspflicht',
    erklaerung:
      'Du bist verpflichtet, bei der Antragsbearbeitung mitzuhelfen – z. B. Unterlagen einzureichen oder Fragen zu beantworten (§ 60 ff. SGB I). Wurde deshalb abgelehnt, reicht es oft, die fehlenden Unterlagen nachzureichen und neu zu beantragen.',
    muster: [/mitwirkungspflicht/i, /mangels mitwirkung/i, /fehlende(r|n)? mitwirkung/i],
  },
  {
    id: 'vorlaeufige-bewilligung',
    begriff: 'Vorläufige Bewilligung',
    erklaerung:
      'Die Leistung wird dir schon gezahlt, aber die endgültige Höhe steht noch nicht fest – zum Beispiel weil dein Einkommen noch nicht abschließend geprüft ist. Später folgt ein endgültiger Bescheid, der auch eine Rückforderung enthalten kann.',
    muster: [/vorläufig(e)?\s*(bewilligt|bewilligung|gewährt)/i],
  },
  {
    id: 'widerrufsvorbehalt',
    begriff: 'Vorbehalt des Widerrufs',
    erklaerung:
      'Die Behörde kann die Entscheidung später zurücknehmen, auch ohne dass sich an den Umständen etwas ändert. Das steht meist bei Leistungen, die von einer Bedingung abhängen, die noch nicht sicher feststeht.',
    muster: [/vorbehalt(s)? des widerrufs/i, /widerrufsvorbehalt/i],
  },
  {
    id: 'nebenbestimmung',
    begriff: 'Nebenbestimmung / Auflage',
    erklaerung:
      'Eine zusätzliche Bedingung, die an die Bewilligung geknüpft ist – z. B. dass du bestimmte Nachweise einreichen musst. Hältst du dich nicht daran, kann die Leistung widerrufen werden.',
    muster: [/nebenbestimmung/i, /\bauflage(n)?\b/i],
  },
  {
    id: 'aufschiebende-wirkung',
    begriff: 'Aufschiebende Wirkung',
    erklaerung:
      'Solange dein Widerspruch läuft, wird die angefochtene Entscheidung normalerweise nicht vollzogen. Ausnahme: Steht zusätzlich „sofortige Vollziehung“ im Bescheid, gilt die Entscheidung trotz Widerspruch sofort.',
    muster: [/aufschiebende wirkung/i],
  },
  {
    id: 'sofortige-vollziehung',
    begriff: 'Sofortige Vollziehung',
    erklaerung:
      'Die Entscheidung gilt sofort, auch wenn du Widerspruch einlegst. Willst du das verhindern, brauchst du zusätzlich einen Eilantrag beim Sozialgericht – lass dich dabei am besten beraten.',
    muster: [/sofortige vollziehung/i, /sofort vollziehbar/i],
  },
  {
    id: 'erstattung',
    begriff: 'Erstattung / Rückforderung',
    erklaerung:
      'Du sollst zu viel gezahlte oder zu Unrecht erhaltene Leistungen zurückzahlen. Prüfe die Begründung genau – oft lohnt sich ein Widerspruch, wenn du den Fehler nicht selbst verursacht hast.',
    muster: [/erstattungsanspruch/i, /zu erstatten/i, /rückforderung/i, /rückzahlung/i],
  },
  {
    id: 'aufhebung',
    begriff: 'Aufhebung / Widerruf / Rücknahme',
    erklaerung:
      'Ein früherer, für dich positiver Bescheid wird ganz oder teilweise für ungültig erklärt – oft verbunden mit einer Rückforderung. Die genauen Gründe stehen in der Begründung, das ist der wichtigste Teil zum Prüfen.',
    muster: [
      /bescheid\s*wird\s*(aufgehoben|widerrufen|zurückgenommen)/i,
      /aufhebung(sbescheid)? des bescheid/i,
      /\baufhebungsbescheid\b/i,
      /§\s*48\s*(abs(atz)?\.?\s*1\s*)?.{0,20}sgb\s*x/i,
    ],
  },
  {
    id: 'ermessen',
    begriff: 'Ermessen',
    erklaerung:
      'Die Behörde hat hier einen Entscheidungsspielraum – es gibt keinen automatischen Anspruch, aber die Entscheidung darf nicht willkürlich sein. Im Widerspruch kannst du gezielt vortragen, welche Umstände zu wenig berücksichtigt wurden.',
    muster: [/nach\s*ermessen/i, /ermessensentscheidung/i, /im rahmen des ermessens/i],
  },
  {
    id: 'bestandskraft',
    begriff: 'Bestandskraft',
    erklaerung:
      'Wird ein Bescheid bestandskräftig, kannst du normalerweise nicht mehr dagegen vorgehen – das passiert, wenn die Widerspruchsfrist ungenutzt verstreicht. Deshalb ist die Frist so wichtig.',
    muster: [/bestandskräftig/i, /bestandskraft/i],
    mehr: { href: '/tools/fristenrechner', label: 'Frist im Blick behalten' },
  },
  {
    id: 'kostenbeitrag',
    begriff: 'Kostenbeitrag / Eigenanteil',
    erklaerung:
      'Der Teil der Kosten, den du je nach Einkommen und Vermögen selbst beitragen musst (§ 136 ff. SGB IX). Die Berechnung steht meist in einer Anlage zum Bescheid – lohnt sich, genau nachzurechnen.',
    muster: [/kostenbeitrag/i, /eigenanteil/i, /einkommenseinsatz/i, /vermögenseinsatz/i],
  },
  {
    id: 'regelbedarf',
    begriff: 'Regelbedarf / Regelsatz',
    erklaerung:
      'Der monatliche Betrag, der laufende Kosten wie Ernährung, Kleidung oder Hygiene abdecken soll. Die Höhe ist gesetzlich festgelegt und wird jährlich angepasst.',
    muster: [/regelbedarf/i, /regelsatz/i],
  },
  {
    id: 'fachleistungsstunden',
    begriff: 'Fachleistungsstunden',
    erklaerung:
      'Die Anzahl an Stunden fachlicher Unterstützung (z. B. im Betreuten Wohnen), die dir pro Woche oder Monat bewilligt wurden.',
    muster: [/fachleistungsstunden/i, /assistenzstunden/i],
    mehr: { href: '/tools/assistenzstunden-orientierung', label: 'Zur Assistenzstunden-Orientierung' },
  },
  {
    id: 'bei',
    begriff: 'BEI – Bedarfsermittlungsinstrument',
    erklaerung:
      'Strukturiertes Instrument, mit dem dein individueller Unterstützungsbedarf erhoben wird (in NRW: BEI_NRW).',
    muster: [/\bBEI\b/, /bedarfsermittlungsinstrument/i],
    mehr: { href: '/glossar/bei/', label: 'Mehr im Wörterbuch' },
  },
  {
    id: 'icf',
    begriff: 'ICF – Internationale Klassifikation der Funktionsfähigkeit',
    erklaerung:
      'Modell der WHO, das Behinderung als Zusammenspiel von Gesundheit, Umwelt und Teilhabe versteht – Grundlage der Bedarfsermittlung.',
    muster: [/\bICF\b/],
    mehr: { href: '/glossar/icf/', label: 'Mehr im Wörterbuch' },
  },
  {
    id: 'bthg',
    begriff: 'BTHG – Bundesteilhabegesetz',
    erklaerung:
      'Reformgesetz, das die Eingliederungshilfe aus der Sozialhilfe herausgelöst und ins SGB IX überführt hat.',
    muster: [/\bBTHG\b/, /bundesteilhabegesetz/i],
    mehr: { href: '/glossar/bthg/', label: 'Mehr im Wörterbuch' },
  },
  {
    id: 'eutb',
    begriff: 'EUTB – Ergänzende unabhängige Teilhabeberatung',
    erklaerung:
      'Kostenlose, unabhängige Beratung rund um Rehabilitation und Teilhabe – unabhängig von Kostenträgern und Leistungserbringern.',
    muster: [/\bEUTB\b/, /ergänzende unabhängige teilhabeberatung/i],
    mehr: { href: '/glossar/eutb/', label: 'Mehr im Wörterbuch' },
  },
  {
    id: 'perseh',
    begriff: 'PerSEH – Personenzentrierte Steuerung der Eingliederungshilfe',
    erklaerung: 'Hessisches Verfahren zur personenzentrierten Bedarfsermittlung und Teilhabeplanung.',
    muster: [/\bPerSEH\b/i],
    mehr: { href: '/glossar/perseh/', label: 'Mehr im Wörterbuch' },
  },
  {
    id: 'hilfeplan',
    begriff: 'Hilfe-, Teilhabe- und Gesamtplan',
    erklaerung:
      'Der Plan, in dem Ziele und Leistungen der Eingliederungshilfe gemeinsam mit dir festgelegt und regelmäßig überprüft werden.',
    muster: [/hilfeplan/i, /gesamtplan/i, /teilhabeplan/i],
    mehr: { href: '/glossar/hilfeplan/', label: 'Mehr im Wörterbuch' },
  },
  {
    id: 'kostentraeger',
    begriff: 'Kostenträger',
    erklaerung: 'Die Stelle, die über deinen Antrag entscheidet und die Leistungen der Eingliederungshilfe finanziert.',
    muster: [/kostenträger/i],
    mehr: { href: '/glossar/kostentraeger/', label: 'Mehr im Wörterbuch' },
  },
  {
    id: 'teilhabe',
    begriff: 'Teilhabe',
    erklaerung: 'Das zentrale Ziel der Eingliederungshilfe: selbstbestimmt und gleichberechtigt am Leben in der Gesellschaft teilnehmen.',
    muster: [/teilhabe/i],
    mehr: { href: '/glossar/teilhabe/', label: 'Mehr im Wörterbuch' },
  },
  {
    id: 'verwaltungsakt',
    begriff: 'Verwaltungsakt',
    erklaerung:
      'Der juristische Fachbegriff für deinen Bescheid selbst – jede verbindliche Entscheidung einer Behörde in einem Einzelfall (§ 31 SGB X). Taucht meist nur in Erklärtexten zur Rechtslage auf, nicht als etwas, das an deiner Situation etwas ändert.',
    muster: [/verwaltungsakt/i],
  },
  {
    id: 'bewilligungszeitraum',
    begriff: 'Bewilligungszeitraum',
    erklaerung:
      'Der Zeitraum, für den die Leistung bewilligt wurde. Danach musst du in der Regel neu beantragen bzw. bekommst rechtzeitig vorher Post dazu – behalte das Enddatum im Blick.',
    muster: [/bewilligungszeitraum/i],
  },
  {
    id: 'leistungsbescheid',
    begriff: 'Leistungs- / Änderungsbescheid',
    erklaerung:
      'Ein Bescheid, der eine laufende Leistung neu festsetzt oder verändert – z. B. weil sich dein Bedarf, Einkommen oder die gesetzliche Grundlage geändert hat. Vergleiche ihn mit dem vorherigen Bescheid, um zu sehen, was sich konkret ändert.',
    muster: [/leistungsbescheid/i, /änderungsbescheid/i],
  },
  {
    id: 'widerspruchsbescheid',
    begriff: 'Widerspruchsbescheid',
    erklaerung:
      'Die Antwort der Behörde auf deinen Widerspruch – entweder wird dir ganz oder teilweise recht gegeben (Abhilfe) oder der Widerspruch wird zurückgewiesen. Wird er zurückgewiesen, kannst du innerhalb eines Monats Klage beim Sozialgericht einreichen.',
    muster: [/widerspruchsbescheid/i, /abhilfebescheid/i],
  },
  {
    id: 'klage',
    begriff: 'Klage / Sozialgericht',
    erklaerung:
      'Der nächste Schritt, wenn dein Widerspruch abgelehnt wurde und du weiter dagegen vorgehen willst. Klagen vor dem Sozialgericht sind für dich kostenlos (keine Gerichtskosten). Lass dich für diesen Schritt am besten beraten, z. B. bei der EUTB.',
    muster: [/\bklage\b/i, /sozialgericht/i],
    mehr: { href: '/glossar/eutb/', label: 'Kostenlose Beratung finden' },
  },
  {
    id: 'zustaendigkeit',
    begriff: 'Örtliche / sachliche Zuständigkeit',
    erklaerung:
      'Welche Behörde für deinen Fall überhaupt verantwortlich ist – das hängt meist von deinem Wohnort und der Art der Leistung ab. Steht das im Bescheid infrage, kann sich das auf die Bearbeitungsdauer auswirken, ändert aber meist nichts an deinem Anspruch selbst.',
    muster: [/örtliche zuständigkeit/i, /sachliche zuständigkeit/i],
  },
  {
    id: 'bevollmaechtigte',
    begriff: 'Bevollmächtigte / Vollmacht',
    erklaerung:
      'Eine Person, die für dich in diesem Verfahren handeln darf – z. B. Betreuer:in, Angehörige oder Anwält:in. Braucht dafür in der Regel eine schriftliche Vollmacht von dir.',
    muster: [/bevollmächtigte(r)?/i, /\bvollmacht\b/i],
  },
  {
    id: 'zustellung',
    begriff: 'Zustellung / Bekanntgabe',
    erklaerung:
      'Der Zeitpunkt, ab dem der Bescheid offiziell als „angekommen“ gilt – meist der Tag, an dem der Brief tatsächlich bei dir eintrifft. Ab diesem Datum läuft in der Regel deine Widerspruchsfrist.',
    muster: [/zustellung/i, /bekanntgabe/i],
    mehr: { href: '/tools/fristenrechner', label: 'Frist ab diesem Datum berechnen' },
  },
  {
    id: 'nachrang',
    begriff: 'Nachrangigkeit / Nachrangprinzip',
    erklaerung:
      'Eingliederungshilfe wird grundsätzlich nur gezahlt, wenn kein anderer Träger (z. B. Krankenkasse, Pflegeversicherung) vorrangig zuständig ist oder du dir nicht zumutbar selbst helfen kannst. Deshalb prüfen Bescheide oft zuerst, ob andere Leistungen infrage kommen.',
    muster: [/nachrangig(keit)?/i, /nachrangprinzip/i, /zumutbare selbsthilfe/i],
  },
  {
    id: 'persoenliches-budget',
    begriff: 'Persönliches Budget',
    erklaerung:
      'Eine Möglichkeit, dir bewilligte Leistungen als Geldbetrag auszahlen zu lassen, mit dem du deine Unterstützung selbst organisierst, statt sie als Sachleistung von einem Anbieter zu bekommen.',
    muster: [/persönliche(s)? budget/i],
  },
  {
    id: 'wunsch-und-wahlrecht',
    begriff: 'Wunsch- und Wahlrecht',
    erklaerung:
      'Dein Recht, bei der Art der Leistung und dem Anbieter deine eigenen berechtigten Wünsche einzubringen (§ 8 SGB IX) – die Behörde muss sie berücksichtigen, sofern sie angemessen und nicht unverhältnismäßig teurer sind.',
    muster: [/wunsch-?\s*und\s*wahlrecht/i],
  },
  {
    id: 'amtsermittlung',
    begriff: 'Amtsermittlungsgrundsatz',
    erklaerung:
      'Die Behörde muss den Sachverhalt von sich aus aufklären, nicht nur das werten, was du einreichst (§ 20 SGB X). Heißt aber nicht, dass du untätig bleiben kannst – aktiv mitzuwirken beschleunigt das Verfahren meist deutlich.',
    muster: [/amtsermittlungsgrundsatz/i, /von amts wegen/i],
  },
];
