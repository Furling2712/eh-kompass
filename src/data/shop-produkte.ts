// PLATZHALTER-DATEI: Aktuell ein Beispiel-Produkt. Echte Therapieprodukte hier ergänzen,
// sobald Material/Preise/Checkout-Links vorliegen (z. B. Gumroad/Lemonsqueezy wie bei den
// Vorlagen unter src/pages/vorlagen/index.astro).

export interface ShopProdukt {
  id: string;
  titel: string;
  beschreibung: string;
  anbieter: string;
  preis: string;
  checkoutUrl: string;
}

export const produkte: ShopProdukt[] = [
  {
    id: 'platzhalter-produkt',
    titel: 'Systemtherapeutisches Material (Platzhalter)',
    beschreibung:
      'Hier entsteht ein Angebot mit systemtherapeutischen Methoden/Materialien für die Eingliederungshilfe.',
    anbieter: 'Wird noch ergänzt',
    preis: '–',
    checkoutUrl: '#',
  },
];
