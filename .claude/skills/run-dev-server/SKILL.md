---
name: run-dev-server
description: Launch and drive the EH-Kompass Astro dev server. Use when asked to run, start, or preview the site locally, or to verify a change works in the running app.
---

# EH-Kompass Astro dev server

Web server (Astro), not a CLI or GUI app. Launch it, then hit it with
`curl` (or a browser) to confirm it's actually serving.

## Launch

```bash
npm run dev
```

Run this in the background (long-running process — it does not exit).

**Known quirk on this machine:** with the Bash tool's background output
capture, `astro dev`'s startup banner (`Local: http://localhost:4321/`
etc.) does not reliably show up in the captured output file even after
10+ seconds, even though the server is already listening. Don't treat a
quiet output file as a failed or still-starting server — verify with a
request instead of waiting longer or re-launching.

## Verify it's up

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321 --max-time 3
```

`200` (or a redirect code) means the server is live. If it fails, check
the background task's output file for an actual error (port already in
use, missing `node_modules` — run `npm install` if so, etc.).

Default port is **4321** (Astro default; this project does not override
it in `astro.config.mjs`). If 4321 is already taken, Astro will pick the
next free port and print it in the (possibly-delayed) startup banner —
check the output file if `curl` on 4321 fails with connection refused.

## Drive it

For a UI change, don't stop at the `200` — open the specific page that
changed (e.g. via browser automation or `curl` on the route) and check
the actual content/markup, not just that the server responds.

## Stop it

It's a background process; leave it running for the rest of the
session unless the user asks to stop it, or kill it via the task ID
Bash gave you when it's no longer needed.
