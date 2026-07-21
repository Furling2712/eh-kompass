import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

// Reine Vermittlungs-Ablage für den WebRTC-Verbindungsaufbau (SDP-Angebote/-Antworten,
// ICE-Kandidaten). Enthält NIEMALS Bild- oder Toninhalte – die laufen bei erfolgreicher
// Verbindung direkt (Peer-to-Peer) zwischen den beiden Browsern. Einträge sind kurzlebig
// (eine Sitzung) und werden beim Auflegen wieder gelöscht.

export const prerender = false;

type SignalPayload = Record<string, unknown>;

interface RoomState {
  offer?: SignalPayload;
  answer?: SignalPayload;
  hostCandidates: SignalPayload[];
  gastCandidates: SignalPayload[];
  updatedAt: number;
}

function emptyRoom(): RoomState {
  return { hostCandidates: [], gastCandidates: [], updatedAt: Date.now() };
}

function sanitizeRoomCode(raw: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().toLowerCase().slice(0, 64);
  if (!/^[a-z0-9-]{1,64}$/.test(trimmed)) return null;
  return trimmed;
}

function getRoomStore() {
  return getStore({ name: 'bewo-signaling', consistency: 'strong' });
}

export const GET: APIRoute = async ({ url }) => {
  const raum = sanitizeRoomCode(url.searchParams.get('raum'));
  if (!raum) {
    return new Response(JSON.stringify({ error: 'ungueltiger_raumcode' }), { status: 400 });
  }

  const store = getRoomStore();
  const state = (await store.get(raum, { type: 'json' })) as RoomState | null;

  return new Response(JSON.stringify(state ?? emptyRoom()), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const raum = sanitizeRoomCode(typeof body.raum === 'string' ? body.raum : null);
  const role = body.role === 'host' || body.role === 'gast' ? body.role : null;
  const action = body.action;

  if (!raum || !role || !action) {
    return new Response(JSON.stringify({ error: 'ungueltige_anfrage' }), { status: 400 });
  }

  const store = getRoomStore();
  const current = ((await store.get(raum, { type: 'json' })) as RoomState | null) ?? emptyRoom();

  if (action === 'offer' && role === 'host') {
    current.offer = body.data;
    current.answer = undefined;
    current.hostCandidates = [];
    current.gastCandidates = [];
  } else if (action === 'answer' && role === 'gast') {
    current.answer = body.data;
  } else if (action === 'ice') {
    if (role === 'host') current.hostCandidates.push(body.data);
    else current.gastCandidates.push(body.data);
  } else {
    return new Response(JSON.stringify({ error: 'ungueltige_aktion' }), { status: 400 });
  }

  current.updatedAt = Date.now();
  await store.setJSON(raum, current);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ url }) => {
  const raum = sanitizeRoomCode(url.searchParams.get('raum'));
  if (!raum) {
    return new Response(JSON.stringify({ error: 'ungueltiger_raumcode' }), { status: 400 });
  }

  await getRoomStore().delete(raum);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
