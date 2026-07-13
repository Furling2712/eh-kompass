// Warenkorb rein im Browser (localStorage) - passend zum "kein Server-Backend
// für öffentliche Seiten"-Grundsatz (siehe SPEC.md). Gespeichert werden nur
// Produkt-IDs + Menge, die eigentlichen Produktdaten (Name/Preis/Bild) kommen
// beim Anzeigen aus src/data/shop-produkte.ts.

const STORAGE_KEY = 'eh-kompass-warenkorb';

export interface CartItem {
  id: string;
  menge: number;
}

export function getCart(): CartItem[] {
  try {
    const roh = localStorage.getItem(STORAGE_KEY);
    return roh ? (JSON.parse(roh) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function speichereCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToCart(id: string, menge = 1): CartItem[] {
  const items = getCart();
  const bestehend = items.find((i) => i.id === id);
  if (bestehend) {
    bestehend.menge += menge;
  } else {
    items.push({ id, menge });
  }
  speichereCart(items);
  return items;
}

export function setQuantity(id: string, menge: number): CartItem[] {
  let items = getCart();
  items = menge < 1 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { ...i, menge } : i));
  speichereCart(items);
  return items;
}

export function removeFromCart(id: string): CartItem[] {
  const items = getCart().filter((i) => i.id !== id);
  speichereCart(items);
  return items;
}

export function clearCart(): void {
  speichereCart([]);
}

export function cartCount(): number {
  return getCart().reduce((summe, i) => summe + i.menge, 0);
}
