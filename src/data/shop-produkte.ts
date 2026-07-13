// Übernommen aus dem bestehenden Werkstatt-Shop (separates Next.js-Projekt bei
// PerSeh/shop), ans Layout von EH-Kompass angepasst. Bestellungen laufen (noch)
// ohne eigenes Backend über eine vorausgefüllte Bestell-E-Mail, siehe
// src/pages/shop/warenkorb/index.astro. BESTELL_EMAIL unten vor dem Launch
// durch die echte Adresse des Systemikers ersetzen.

export const BESTELL_EMAIL = 'bestellung@beispiel.de'; // TODO: echte Adresse eintragen

export interface ShopProdukt {
  id: string;
  name: string;
  beschreibung: string;
  details: string[];
  preis: number;
  bild: string;
  kategorie: string;
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
    lieferzeit: '5–10 Werktage',
    anbieter: 'Unser Systemiker',
  },
];
