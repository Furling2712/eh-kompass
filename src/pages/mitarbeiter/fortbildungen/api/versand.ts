import type { APIRoute } from 'astro';
import { RESEND_API_KEY, STATUS_LINK_SECRET } from 'astro:env/server';
import { erstelleZugang, sendeZugangsMail } from '../../../../lib/fortbildungen';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  const mitarbeiterId = typeof body?.mitarbeiterId === 'string' ? body.mitarbeiterId : null;
  const fobiId = typeof body?.fobiId === 'string' ? body.fobiId : null;

  if (!mitarbeiterId || !fobiId) {
    return new Response(JSON.stringify({ error: 'ungueltige_anfrage' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { token, mitarbeiter, fobi } = await erstelleZugang(mitarbeiterId, fobiId);
    await sendeZugangsMail(RESEND_API_KEY, mitarbeiter, fobi, token, STATUS_LINK_SECRET);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'versand_fehlgeschlagen', detail: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
