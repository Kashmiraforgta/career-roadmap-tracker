import { createClient } from "@supabase/supabase-js";

// This file only ever runs on the server (inside app/api routes).
// The service role key must NEVER be prefixed with NEXT_PUBLIC_ or it
// would be shipped to the browser.
let client = null;

export function getSupabaseAdmin() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  client = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  return client;
}
