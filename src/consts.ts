// Zentrale Seiten-Konstanten. Vor Launch anpassen (Domain, Betreiberdaten in impressum.astro).
export const SITE_TITLE = 'EH-Kompass';
export const SITE_TAGLINE = 'Eingliederungshilfe verständlich erklärt';
export const SITE_DESCRIPTION =
  'Praxisnaher Ratgeber und kostenlose Tools rund um die Eingliederungshilfe nach § 113 SGB IX — aus echter Erfahrung im psychiatrischen Betreuten Wohnen.';

// Hauptnavigation
export const NAV_LINKS = [
  { href: '/ratgeber/', label: 'Ratgeber' },
  { href: '/glossar/', label: 'Glossar' },
  { href: '/tools/', label: 'Tools' },
  { href: '/vorlagen/', label: 'Vorlagen' },
  { href: '/ueber-mich', label: 'Über mich' },
];

// Footer-Rechtslinks
export const LEGAL_LINKS = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
];
