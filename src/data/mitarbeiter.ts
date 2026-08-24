// Mitarbeiterverzeichnis für die Pflicht-Fortbildungen (Zugangslinks + Erinnerungsmails).
// Bitte mit den echten Namen/Mailadressen befüllen, bevor die Fortbildungen live gehen.
// E-Mails folgen im Team dem Muster vorname.nachname@ptv-euregio.de, werden hier aber bewusst
// explizit eingetragen statt automatisch aus dem Namen abgeleitet (robuster bei Umlauten/Sonderfällen).

export interface MitarbeiterEintrag {
  id: string;
  name: string;
  email: string;
}

export const mitarbeiterListe: MitarbeiterEintrag[] = [
  {
    id: 'alexander-radler',
    name: 'Alexander Radler',
    email: 'alexander.radler@ptv-euregio.de',
  },
  // TODO: weitere Mitarbeiter:innen eintragen
];
