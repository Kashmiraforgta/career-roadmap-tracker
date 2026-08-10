# Setting up cross-device sync (Supabase + Vercel)

This app now stores your progress in a small Postgres database (via Supabase's
free tier) instead of only the browser. One passphrase unlocks it on any
device.

## 1. Create a free Supabase project

1. Go to https://supabase.com → sign up → "New project".
2. Pick any name/region, set a database password (you won't need this password
   day-to-day, just save it somewhere).
3. Wait ~2 minutes for the project to provision.

## 2. Create the table

In the Supabase dashboard, go to **SQL Editor** → New query → paste and run:

```sql
create table tracker_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
```

That's it — one table, one row (your tracker uses a fixed row id internally).

## 3. Get your API keys

In Supabase: **Project Settings → API**.

- Copy **Project URL** → this is `SUPABASE_URL`
- Copy the **service_role** key (NOT the "anon public" key) → this is
  `SUPABASE_SERVICE_ROLE_KEY`

The service_role key is powerful (it bypasses row-level security), which is
why it's only ever used inside the server-side API route (`app/api/state/route.js`)
and never exposed to the browser.

## 4. Choose a passphrase

Pick any password only you know. This becomes `TRACKER_PASSPHRASE`. It's what
you'll type in on each new device/browser to unlock your synced data. It is
checked server-side; it's not a highly sensitive secret like a bank password,
but don't reuse a real password of yours here.

## 5. Set environment variables

**Local dev:** copy `.env.local.example` to `.env.local` and fill in the three
values.

**Vercel:** Project → Settings → Environment Variables → add all three:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TRACKER_PASSPHRASE`

Redeploy after adding them (Vercel doesn't hot-reload env vars into an
existing deployment).

## 6. Deploy

Push this project to a GitHub repo and import it into Vercel as usual (or run
`vercel` from this folder if you use the CLI). No other config needed —
`next.config.mjs` is untouched.

## How it behaves day to day

- First time on a device: you'll see a passphrase screen. Enter it once — it's
  remembered on that device after that.
- Every change you make is cached instantly to localStorage (so the app never
  feels slow) and pushed to Supabase ~1 second after you stop clicking.
- Opening the app on another device pulls your latest saved state from
  Supabase automatically.
- If you're offline, the app keeps working from the local cache and shows
  "Offline — showing local copy" in the header; it'll sync again once you're
  back online.
- Wrong passphrase, or the server env vars aren't set → you'll be sent back to
  the passphrase screen.

## Cost

Supabase's free tier (500MB database, no time limit) is enormous overkill for
this — a single JSON row is a few KB. This will stay free indefinitely for
personal use.
