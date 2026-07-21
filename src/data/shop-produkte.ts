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
];
