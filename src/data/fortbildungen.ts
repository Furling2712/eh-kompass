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
    id: 'datenschutz',
    titel: 'Datenschutzunterweisung',
    beschreibung:
      'Jährliche Pflichtunterweisung zu DSGVO, besonderen Kategorien personenbezogener Daten in der Eingliederungshilfe, Schweigepflicht und Verhalten im Arbeitsalltag.',
    gueltigkeitMonate: 12,
    bestehensgrenzeProzent: 70,
    fragen: [
      {
        frage: 'Wie oft muss die Datenschutzunterweisung mindestens wiederholt werden?',
        antworten: ['Nur bei Einstellung', 'Mindestens jährlich', 'Alle 2 Jahre', 'Nie erneut nötig'],
        richtigIndex: 1,
      },
      {
        frage: 'Welche Tastenkombination sperrt den Bildschirm beim Verlassen des Arbeitsplatzes?',
        antworten: ['Alt+F4', 'Strg+L', 'Windows-Taste + L', 'Strg+Alt+Entf'],
        richtigIndex: 2,
      },
      {
        frage: 'Wie werden nicht mehr benötigte Akten mit personenbezogenen Daten entsorgt?',
        antworten: ['Recyclingpapier-Sammlung', 'Aktenvernichtung (Schredder)', 'Normaler Papiermüll', 'Verbrennen'],
        richtigIndex: 1,
      },
      {
        frage: 'Ein Klient fragt: „Was steht eigentlich über mich in der Akte?“ Wie reagieren Sie?',
        antworten: ['Ignorieren', 'An Leitung/Datenschutzbeauftragte weiterleiten', 'Sofort selbst Auskunft geben', 'Anfrage ablehnen'],
        richtigIndex: 1,
      },
      {
        frage: 'Dürfen private E-Mail-Konten oder WhatsApp für dienstliche Zwecke mit personenbezogenen Daten genutzt werden?',
        antworten: ['Ja, bei Eilbedürftigkeit', 'Ja, immer', 'Nur mit mündlicher Erlaubnis der Kollegen', 'Nein, grundsätzlich nicht – außer dienstlich freigegebenes Verfahren'],
        richtigIndex: 3,
      },
      {
        frage: 'Was ist beim Verdacht auf einen Datenschutzvorfall zu tun?',
        antworten: ['Ein Jahr abwarten', 'Unverzüglich Geschäftsführung UND Datenschutzbeauftragte informieren', 'Nur melden, wenn man sich sicher ist', 'Selbst klären, bevor man meldet'],
        richtigIndex: 1,
      },
      {
        frage: 'Innerhalb welcher Frist muss ein meldepflichtiger Vorfall ggf. der Aufsichtsbehörde gemeldet werden?',
        antworten: ['1 Monat', '24 Stunden', '1 Woche', '72 Stunden'],
        richtigIndex: 3,
      },
      {
        frage: 'Wie lange gilt die Schweigepflicht für Mitarbeitende?',
        antworten: ['Nur während der Beschäftigung', 'Nur bei aktiven Fällen', 'Auch nach Beendigung des Beschäftigungsverhältnisses fort', 'Endet mit der Kündigung'],
        richtigIndex: 2,
      },
      {
        frage: 'Dürfen personenbezogene Klientendaten in nicht freigegebene KI-Tools eingegeben werden?',
        antworten: ['Nur mit mündlicher Zustimmung des Klienten', 'Ja, bei dringendem Bedarf', 'Ja, wenn anonymisiert wirkt', 'Nein, grundsätzlich nicht'],
        richtigIndex: 3,
      },
      {
        frage: 'Welches Prinzip gilt beim Informationsaustausch im Team (Übergaben, Besprechungen)?',
        antworten: ['Kein Austausch erlaubt', 'Nur schriftlich weitergeben', 'Need-to-know-Prinzip – nur notwendige Infos', 'Möglichst umfassend alle Infos teilen'],
        richtigIndex: 2,
      },
    ],
  },
  {
    id: 'arbeitssicherheit',
    titel: 'Erstunterweisung Arbeitssicherheit',
    beschreibung:
      'Allgemeine Sicherheitsunterweisung zu Arbeitsschutz, BGW, Erster Hilfe, Brandschutz, Leitern/PSA, elektrischen Geräten, Ergonomie sowie Heben und Tragen.',
    gueltigkeitMonate: 12,
    bestehensgrenzeProzent: 70,
    fragen: [
      {
        frage: 'Wie heißt die Berufsgenossenschaft für das Gesundheits- und Sozialwesen?',
        antworten: ['VBG', 'BG Bau', 'BGW – Berufsgenossenschaft für Gesundheitsdienst und Wohlfahrtspflege', 'BGHW'],
        richtigIndex: 2,
      },
      {
        frage: 'Wo beginnt und endet der Versicherungsschutz bei einem Wegeunfall?',
        antworten: ['Am Briefkasten', 'An der Außentür des Wohngebäudes', 'Erst ab der Straße', 'An der Haustür des Betriebs'],
        richtigIndex: 1,
      },
      {
        frage: 'Ist ein Umweg versichert, wenn man dabei ein Kind zur Kita bringt?',
        antworten: ['Nur am Montag', 'Nur mit schriftlicher Genehmigung', 'Ja, das ist versichert', 'Nein, nie'],
        richtigIndex: 2,
      },
      {
        frage: 'Was sollte nach einem Arbeitsunfall unbedingt aufgesucht werden?',
        antworten: ['Direkt die Apotheke', 'Ein von der Berufsgenossenschaft zugelassener Durchgangsarzt', 'Keinen Arzt, außer bei starken Schmerzen', 'Ein beliebiger Hausarzt'],
        richtigIndex: 1,
      },
      {
        frage: 'Welche Nummer wählt man bei einem Notfall für den Rettungswagen?',
        antworten: ['19222', '110', '112', '116117'],
        richtigIndex: 2,
      },
      {
        frage: 'Was gehört zu den Aufgaben der Fachkraft für Arbeitssicherheit?',
        antworten: ['Kundenakquise', 'Nur die Reinigung der Räume', 'Ausschließlich Gehaltsabrechnung', 'Beratung zu Arbeitsschutz, Gefährdungsbeurteilungen und Schulungen'],
        richtigIndex: 3,
      },
      {
        frage: 'Wie viele Personen dürfen gleichzeitig auf einer Leiter stehen?',
        antworten: ['Keine Vorgabe', 'Maximal zwei', 'Beliebig viele', 'Nur eine Person'],
        richtigIndex: 3,
      },
      {
        frage: 'Was ist beim Heben schwerer Lasten zu beachten?',
        antworten: ['Immer mit Drehbewegung heben', 'Last möglichst weit vom Körper wegstrecken', 'Knie beugen statt Rücken, Last nah am Körper halten', 'Rücken beugen, Beine gerade lassen'],
        richtigIndex: 2,
      },
      {
        frage: 'Welche Farbe haben Rettungszeichen (z. B. Notausgang)?',
        antworten: ['Blau', 'Rot', 'Gelb', 'Grün'],
        richtigIndex: 3,
      },
      {
        frage: 'Was ist bei einem beschädigten Elektrogerät (z. B. Riss, loses Kabel) richtig?',
        antworten: ['Selbst reparieren', 'Weiterbenutzen, wenn es noch funktioniert', 'Nur mit Handschuhen weiterbenutzen', 'Nicht benutzen und melden'],
        richtigIndex: 3,
      },
    ],
  },
  {
    id: 'ki-schulung',
    titel: 'KI-Schulung',
    beschreibung:
      'Sicherer und datenschutzkonformer Umgang mit KI-Sprachmodellen (Claude, ChatGPT, Gemini u. a.) im dienstlichen Kontext, inkl. Freigaberegeln und Verhalten bei Vorfällen.',
    gueltigkeitMonate: 12,
    bestehensgrenzeProzent: 70,
    fragen: [
      {
        frage: 'Was ist eine „Halluzination“ bei KI-Sprachmodellen?',
        antworten: ['Ein Sicherheitsvirus', 'Überzeugend klingende, aber falsche Information', 'Eine Art Datenverschlüsselung', 'Ein technischer Serverfehler'],
        richtigIndex: 1,
      },
      {
        frage: 'Wer trägt die Verantwortung für die Richtigkeit eines dienstlich genutzten KI-Textes?',
        antworten: ['Die IT-Abteilung allein', 'Der KI-Anbieter', 'Die Mitarbeitenden, die den Text nutzen', 'Niemand – das System entscheidet selbst'],
        richtigIndex: 2,
      },
      {
        frage: 'Was passiert in der Regel mit Daten, die in ein KI-Tool eingegeben werden?',
        antworten: ['Sie werden automatisch gelöscht', 'Sie verlassen die eigene IT-Infrastruktur und werden auf Anbieter-Servern verarbeitet', 'Sie sind für niemanden einsehbar', 'Sie bleiben ausschließlich auf dem eigenen Rechner'],
        richtigIndex: 1,
      },
      {
        frage: 'Welche Angaben dürfen NIEMALS in ein KI-Tool eingegeben werden?',
        antworten: ['Fiktive Beispieltexte', 'Programmcode ohne Klientendaten', 'Diagnosen und Gesundheitsdaten von Klient*innen', 'Allgemeine Musterschreiben'],
        richtigIndex: 2,
      },
      {
        frage: 'Reicht es, bei Klientendaten nur den Namen wegzulassen, um sie „anonym“ einzugeben?',
        antworten: ['Ja, wenn zusätzlich das Geburtsdatum weggelassen wird', 'Das ist gesetzlich nicht geregelt', 'Ja, das reicht immer', 'Nein – durch andere Angaben kann die Person trotzdem identifizierbar sein'],
        richtigIndex: 3,
      },
      {
        frage: 'Wer muss den dienstlichen Einsatz eines neuen KI-Tools vorher freigeben?',
        antworten: ['Der Betriebsrat', 'Geschäftsführung bzw. Datenschutzbeauftragte', 'Die IT-Abteilung ohne weitere Prüfung', 'Jede/r Mitarbeitende selbst'],
        richtigIndex: 1,
      },
      {
        frage: 'Dürfen private/kostenlose KI-Accounts für dienstliche Zwecke mit personenbezogenen Daten genutzt werden?',
        antworten: ['Ja, mit Zustimmung eines Kollegen', 'Nur am Wochenende', 'Nein', 'Ja, wenn es schneller geht'],
        richtigIndex: 2,
      },
      {
        frage: 'Was tun bei Unsicherheit, ob eine geplante KI-Nutzung zulässig ist?',
        antworten: ['Auf die nächste Schulung warten', 'Die Nutzung heimlich durchführen', 'Einfach ausprobieren und im Zweifel melden', 'Vorher nachfragen statt nachträglich melden'],
        richtigIndex: 3,
      },
      {
        frage: 'Was ist bei versehentlicher Eingabe sensibler Daten in ein KI-Tool zu tun?',
        antworten: ['Erst nach Rücksprache mit Kolleg*innen entscheiden', 'Nichts, das lässt sich nicht mehr ändern', 'Sofort Einrichtungsleitung UND Datenschutzbeauftragte informieren', 'Selbst versuchen zu löschen und nicht weiter melden'],
        richtigIndex: 2,
      },
      {
        frage: 'Welche Faustregel hilft bei der Entscheidung, was in ein KI-Tool darf?',
        antworten: ['Alles, was kürzer als ein Satz ist', 'Alles, was auch im Internet steht', 'Alles, was der Klient mündlich erlaubt hat', 'Würde ich diese Info auch einem fremden Unternehmen im Ausland per E-Mail schicken?'],
        richtigIndex: 3,
      },
    ],
  },
];
