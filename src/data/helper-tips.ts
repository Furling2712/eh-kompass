// Tipps für den Navigations-Begleiter (Helper.astro). Kein KI-Modell - einfache
// Zuordnung Seite -> Hinweistext. Reihenfolge egal, es wird immer der Eintrag mit
// dem längsten passenden pathPrefix genommen (Fallback: der Eintrag mit '/').

export interface HelperTip {
  pathPrefix: string;
  message: string;
  links?: { href: string; label: string }[];
}

export const helperTips: HelperTip[] = [
  {
    pathPrefix: '/',
    message:
      'Willkommen! Wenn du gerade einen Bescheid bekommen hast und nicht weißt, was jetzt zu tun ist, schau zuerst hier vorbei.',
    links: [{ href: '/ratgeber/bescheid-erhalten-was-tun', label: 'Bescheid erhalten – was tun?' }],
  },
  {
    pathPrefix: '/ratgeber',
    message: 'Hier findest du Artikel, die dir den Ablauf und deine Möglichkeiten erklären.',
    links: [
      { href: '/ratgeber/eingliederungshilfe-grundlagen', label: 'Am besten hier anfangen' },
    ],
  },
  {
    pathPrefix: '/glossar',
    message: 'Ein unbekanntes Wort gehört? Hier findest du kurze, einfache Erklärungen dazu.',
  },
  {
    pathPrefix: '/tools/fristenrechner',
    message: 'Trag dein Zustelldatum ein – wir errechnen dir die Frist für den Widerspruch.',
  },
  {
    pathPrefix: '/tools/assistenzstunden-orientierung',
    message: 'Beantworte die Fragen so ehrlich wie möglich – es gibt kein richtig oder falsch.',
  },
  {
    pathPrefix: '/tools/widerspruch-generator',
    message: 'Wir setzen dir einen Entwurf zusammen, den du danach noch anpassen kannst.',
  },
  {
    pathPrefix: '/tools',
    message: 'Hier findest du kostenlose Rechner und Hilfsmittel für deinen Antrag.',
  },
  {
    pathPrefix: '/bei-generierung',
    message: 'Unterstützung bei der BEI-Generierung für andere BeWo-Anbieter.',
  },
  {
    pathPrefix: '/shop',
    message: 'Hier findest du weiterführende Angebote.',
  },
];

export function findHelperTip(pathname: string): HelperTip {
  const treffer = helperTips
    .filter((t) => t.pathPrefix === '/' ? pathname === '/' : pathname.startsWith(t.pathPrefix))
    .sort((a, b) => b.pathPrefix.length - a.pathPrefix.length);
  return treffer[0] ?? helperTips[0];
}
