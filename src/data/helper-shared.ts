// Gemeinsame Typen und Matching-Logik für die Navigations-Begleiter (öffentlicher
// KI-Helfer und der Mitarbeiter-Helfer "Dennis"). Kein KI-Modell - einfache Zuordnung
// Pfad -> Hinweistext. Es wird immer der Eintrag mit dem längsten passenden pathPrefix
// genommen (Fallback: der erste Eintrag der Liste). Einträge mit `exact: true` matchen
// nur genau diesen Pfad (nicht auch Unterseiten) und gewinnen dann gegen Prefix-Einträge
// – wichtig für Touren, deren Selektoren nur auf einer bestimmten Seite existieren (z. B.
// eine Listing-/Dashboard-Seite, nicht deren Detail-Unterseiten).

export interface HelperTourStep {
  /** CSS-Selektor des Ziel-Elements auf der aktuellen Seite (muss eindeutig sein, z. B. eine id) */
  selector: string;
  message: string;
}

export interface HelperTip {
  pathPrefix: string;
  /** Nur exakt diesen Pfad matchen, nicht auch Unterseiten. Gewinnt gegen Prefix-Einträge. */
  exact?: boolean;
  message: string;
  links?: { href: string; label: string }[];
  /** Optionaler begehbarer Rundgang für diese Seite. Fehlt er, gibt es keinen "Rundgang starten"-Button. */
  tour?: HelperTourStep[];
}

function normalizePath(p: string): string {
  return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p;
}

export function matchHelperTip(tips: HelperTip[], pathname: string): HelperTip {
  const norm = normalizePath(pathname);
  const exactTreffer = tips.find((t) => t.exact && normalizePath(t.pathPrefix) === norm);
  if (exactTreffer) return exactTreffer;

  const treffer = tips
    .filter((t) => !t.exact && pathname.startsWith(t.pathPrefix))
    .sort((a, b) => b.pathPrefix.length - a.pathPrefix.length);
  return treffer[0] ?? tips[0];
}
