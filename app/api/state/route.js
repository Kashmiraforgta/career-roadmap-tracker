import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabaseAdmin";

// Single-user tracker -> everything lives under one fixed row id.
const ROW_ID = "default";

function checkAuth(request) {
  const expected = process.env.TRACKER_PASSPHRASE;
  const provided = request.headers.get("x-tracker-passphrase");
  if (!expected) {
    // Misconfigured server - fail closed rather than silently open.
    return false;
  }
  return provided === expected;
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("tracker_state")
      .select("data, updated_at")
      .eq("id", ROW_ID)
      .maybeSingle();

    if (error) throw error;

    return NextResponse.json({
      data: data?.data ?? null,
      updatedAt: data?.updated_at ?? null,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("tracker_state").upsert({
      id: ROW_ID,
      data: body,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
