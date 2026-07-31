// Übernommen aus dem bestehenden Werkstatt-Shop (separates Next.js-Projekt bei
// PerSeh/shop), ans Layout von EH-Kompass angepasst. Bestellungen laufen (noch)
// ohne eigenes Backend über eine vorausgefüllte Bestell-E-Mail, siehe
// src/pages/shop/warenkorb/index.astro. BESTELL_EMAIL unten vor dem Launch
// durch die echte Adresse des Systemikers ersetzen.

export const BESTELL_EMAIL = 'alexander.radler@ptv-euregio.de'; // TODO: echte Adresse eintragen

export interface ShopKategorie {
  slug: string;
  label: string;
  beschreibung: string;
}

export const kategorien: ShopKategorie[] = [
  {
    slug: 'therapie-paedagogik',
    label: 'Therapie & Pädagogik',
    beschreibung:
      'Handgefertigte Materialien für therapeutische und pädagogische Arbeit, z. B. Aufstellungsarbeit, Supervision und Coaching.',
  },
  {
    slug: 'skills',
    label: 'Skills',
    beschreibung:
      'Kleine Hilfsmittel für den Krisenkoffer und den Alltag – Skills zum Anfassen gegen Anspannung und Dissoziation.',
  },
];

export interface ShopProdukt {
  id: string;
  name: string;
  beschreibung: string;
  details: string[];
  preis: number;
  bild: string;
  kategorie: string;
  kategorieSlug: string;
  lieferzeit: string;
  anbieter: string;
}

export const produkte: ShopProdukt[] = [
  {
    id: 'aufstellungsbrett',
    name: 'Aufstellungsbrett',
    beschreibung:
      'Unser Aufstellungsbrett für die Schematherapie ist ein hochwertiges, handgefertigtes Holzbrett, das in unserer Werkstatt mit viel Sorgfalt hergestellt wird. Es eignet sich hervorragend für therapeutische Arbeit, Supervision und Coaching.',
    details: [
      'Zweiteiliges Holzbrett mit Einteilungen',
      'Verschiedene Holzfiguren (groß und klein)',
      'Holzscheiben und Holzwürfel',
      'Farbige Schnüre (grün, schwarz, rot)',
      'Hochwertige Filztasche zur Aufbewahrung',
      'Handgefertigt in unserer Werkstatt',
    ],
    preis: 139.99,
    bild: '/images/shop/aufstellungsbrett.png',
    kategorie: 'Therapie & Pädagogik',
    kategorieSlug: 'therapie-paedagogik',
    lieferzeit: '5–10 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'skillball',
    name: 'Skillball',
    beschreibung:
      'Ein griffiger Knautschball für die Hosentasche. Hilft, körperliche Anspannung in akuten Momenten über die Hände abzuleiten – ein einfacher, jederzeit verfügbarer Skill.',
    details: [
      'Angenehme, griffige Oberflächenstruktur',
      'Passt in jede Tasche',
      'Waschbar',
    ],
    preis: 6.9,
    bild: '/images/shop/Skillball.png',
    kategorie: 'Skills',
    kategorieSlug: 'skills',
    lieferzeit: '3–5 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'riechstaebchen',
    name: 'Riechstäbchen',
    beschreibung:
      'Ein intensiver Geruchsreiz kann in Momenten von Dissoziation oder starker Anspannung helfen, wieder im Hier und Jetzt anzukommen. 10 Riechampullen aus Glas für den Krisenkoffer oder die Hosentasche.',
    details: ['10 Riechampullen aus Glas à 0,4 ml', 'Intensiver, kurzer Reiz', 'Ergiebig'],
    preis: 8.5,
    bild: '/images/shop/Riechst%C3%A4bchen.png',
    kategorie: 'Skills',
    kategorieSlug: 'skills',
    lieferzeit: '3–5 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'himbeer-chili-bonbons',
    name: 'Himbeer-Chili Bonbons',
    beschreibung:
      'Ein starker Geschmacksreiz als Skill gegen Anspannung und Dissoziation (bekannt aus der DBT-Skills-Arbeit) – fruchtig-scharfe Bonbons mit Himbeere und Chili. 200g-Beutel für den Krisenkoffer.',
    details: [
      '200g-Beutel, wiederverschließbar',
      'Fruchtig-scharfer Geschmacksreiz',
      'Für den Krisenkoffer geeignet',
    ],
    preis: 5.9,
    bild: '/images/shop/Himbeer%20Chilli%20Skillbonbons.png',
    kategorie: 'Skills',
    kategorieSlug: 'skills',
    lieferzeit: '3–5 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  // TODO: Bilder für die folgenden 8 Positionen sind nur thematisch passende Pexels-Platzhalter
  // (freie Lizenz, aber fremde Produkte) – zeigen NICHT unsere echten Werkstattstücke. Vor Launch
  // durch eigene Produktfotos ersetzen, sobald die Schreinerei sie tatsächlich gebaut hat.
  {
    id: 'ersatzfiguren-set',
    name: 'Ersatzfiguren-Set fürs Aufstellungsbrett',
    beschreibung:
      'Zusatzset mit weiteren Holzfiguren für unser Aufstellungsbrett – nützlich, wenn in der Aufstellung mehr Personen oder Ersatzobjekte vorkommen als im Grundset, oder wenn einzelne Figuren verloren gehen. Passt auf das bestehende Brett.',
    details: [
      '10 zusätzliche Holzfiguren, groß und klein gemischt',
      'Passgenau zum bestehenden Aufstellungsbrett',
      'Handgefertigt in unserer Werkstatt',
      'Kleine Stofftasche zur Aufbewahrung',
    ],
    preis: 24.9,
    bild: '/images/shop/ersatzfiguren-set.jpg',
    kategorie: 'Therapie & Pädagogik',
    kategorieSlug: 'therapie-paedagogik',
    lieferzeit: '5–10 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'sandspiel-kiste',
    name: 'Sandspiel-Kiste',
    beschreibung:
      'Holzkiste für die Sandspiel-Therapie nach Dora Kalff. Der blau lackierte Boden simuliert Wasser, sobald der Sand beiseite geschoben wird – ein klassisches Element der Sandtray-Arbeit. Handgefertigt, ohne Sand oder Figuren.',
    details: [
      'Innenmaß ca. 50 × 70 × 7 cm',
      'Boden und Innenwände blau lackiert (simuliert Wasser)',
      'Robuste Holzkonstruktion, stapelbar',
      'Sand und Miniaturfiguren nicht enthalten',
      'Handgefertigt in unserer Werkstatt',
    ],
    preis: 129.0,
    bild: '/images/shop/sandspiel-kiste.jpg',
    kategorie: 'Therapie & Pädagogik',
    kategorieSlug: 'therapie-paedagogik',
    lieferzeit: '5–10 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'bodenanker-set',
    name: 'Bodenanker-Set aus Holz',
    beschreibung:
      'Bodenanker für systemisches Coaching, NLP-Arbeit und Aufstellungen im Raum – als robuste Holzscheiben statt der sonst üblichen Filz- oder Pappmarker. Beschriftbar, wiederverwendbar und deutlich langlebiger.',
    details: [
      '6 runde Holzscheiben, ca. 15 cm Durchmesser',
      'Beschriftbar mit Kreide oder abwischbarem Stift',
      'Rutschfeste Unterseite',
      'Stoffbeutel zur Aufbewahrung und zum Transport',
      'Handgefertigt in unserer Werkstatt',
    ],
    preis: 34.9,
    bild: '/images/shop/bodenanker-set.jpg',
    kategorie: 'Therapie & Pädagogik',
    kategorieSlug: 'therapie-paedagogik',
    lieferzeit: '5–10 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'krisenbox',
    name: 'Krisenbox aus Holz',
    beschreibung:
      'Stabile Holzbox zum Befüllen mit den eigenen Notfall-Skills – Riechstäbchen, Bonbons, Skillball und Co. finden darin einen festen Platz statt lose in der Tasche zu liegen. Leer geliefert, nach dem Prinzip des DBT-Notfallkoffers.',
    details: [
      'Innenmaß ca. 20 × 15 × 8 cm',
      'Stabiler Klappdeckel mit Magnetverschluss',
      'Leer geliefert – frei befüllbar mit eigenen Skills',
      'Handgefertigt in unserer Werkstatt',
    ],
    preis: 39.9,
    bild: '/images/shop/krisenbox.jpg',
    kategorie: 'Skills',
    kategorieSlug: 'skills',
    lieferzeit: '5–10 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'erdungswuerfel',
    name: 'Erdungswürfel 5-4-3-2-1',
    beschreibung:
      'Handlicher Holzwürfel mit eingravierter 5-4-3-2-1-Übung – für den Moment, in dem gerade kein Handy oder Zettel zur Hand ist. Das haptische Gegenstück zu unserer Anleitung in der Skill-Zone.',
    details: [
      'Würfel aus Buchenholz, ca. 4 × 4 × 4 cm',
      '5-4-3-2-1-Übung auf den Seitenflächen eingraviert',
      'Passt in jede Hosentasche',
      'Handgefertigt in unserer Werkstatt',
    ],
    preis: 14.9,
    bild: '/images/shop/erdungswuerfel.jpg',
    kategorie: 'Skills',
    kategorieSlug: 'skills',
    lieferzeit: '3–5 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'genogramm-symbolset',
    name: 'Genogramm-Symbolset',
    beschreibung:
      'Holzsymbole für die systemische Familientherapie und Genogrammarbeit – Kreise, Quadrate und Verbindungsstücke zum Legen von Familienstrukturen auf dem Tisch, statt sie nur auf Papier zu zeichnen.',
    details: [
      'Je 8 Kreise und Quadrate in zwei Größen',
      'Verbindungsstücke für Beziehungslinien',
      'Farblich nach Geschlecht/Generation unterscheidbar',
      'Stoffbeutel zur Aufbewahrung',
      'Handgefertigt in unserer Werkstatt',
    ],
    preis: 32.9,
    bild: '/images/shop/genogramm-symbolset.jpg',
    kategorie: 'Therapie & Pädagogik',
    kategorieSlug: 'therapie-paedagogik',
    lieferzeit: '5–10 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'tastbrett-snoezelen',
    name: 'Tastbrett für Snoezelen & Basale Stimulation',
    beschreibung:
      'Brett mit unterschiedlichen Holzoberflächen und -strukturen zum Ertasten – für Snoezelen-Angebote und die basale Stimulation. Jedes Feld bietet einen anderen Sinnesreiz, von glatt geschliffen bis grob strukturiert.',
    details: [
      'Ca. 30 × 40 cm, 8 unterschiedliche Oberflächenfelder',
      'Verschiedene Holzarten und Bearbeitungen (glatt, gerillt, gebürstet, …)',
      'Robuste Trägerplatte, abwaschbar',
      'Handgefertigt in unserer Werkstatt',
    ],
    preis: 44.9,
    bild: '/images/shop/tastbrett-snoezelen.jpg',
    kategorie: 'Therapie & Pädagogik',
    kategorieSlug: 'therapie-paedagogik',
    lieferzeit: '5–10 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
  {
    id: 'ressourcenkiste',
    name: 'Ressourcen- & Schatzkiste',
    beschreibung:
      'Kleine Holzkiste zum Sammeln von Erinnerungsstücken, Fotos und Objekten mit persönlicher Bedeutung – für Trauerbegleitung und Traumaarbeit. Auf Wunsch mit Gravur (z. B. Name oder Datum) personalisierbar, bitte bei Bestellung im Kommentarfeld angeben.',
    details: [
      'Innenmaß ca. 18 × 13 × 10 cm',
      'Klappdeckel mit einfachem Verschluss',
      'Optionale Gravur auf dem Deckel (bei Bestellung angeben)',
      'Handgefertigt in unserer Werkstatt',
    ],
    preis: 49.9,
    bild: '/images/shop/ressourcenkiste.jpg',
    kategorie: 'Therapie & Pädagogik',
    kategorieSlug: 'therapie-paedagogik',
    lieferzeit: '5–10 Werktage',
    anbieter: 'PTV-Euregio e.V.',
  },
];
