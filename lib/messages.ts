"use client";

/* ----------------------------------------------------------------
   Anonymous contact messages -> Supabase (insert only).

   This uses Supabase's PostgREST HTTP endpoint directly instead of
   @supabase/supabase-js, so no extra dependency is shipped to the
   browser. The two NEXT_PUBLIC_* values are public by design (the
   anon key is meant to be visible to clients); RLS on the table is
   what actually limits what the anon key can do:

     - INSERT  : allowed (public can leave a message)
     - SELECT  : no policy -> denied, so nobody can read messages
     - UPDATE / DELETE : no policies -> denied

   NEVER put a service_role key here or anywhere in client code.
   ---------------------------------------------------------------- */

const TABLE = "contact_messages";
const TIMEOUT_MS = 10000;

function readConfig(): { endpoint: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      "Contact backend not configured: set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see docs/supabase_contact_messages.sql)."
    );
    return null;
  }

  return { endpoint: `${url.replace(/\/+$/, "")}/rest/v1/${TABLE}`, key };
}

/**
 * Insert one anonymous message. Only `{ message }` is sent — no name,
 * email, or any other personal information.
 */
export async function sendAnonymousMessage(message: string): Promise<void> {
  const config = readConfig();
  if (!config) throw new Error("contact backend is not configured");

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`message insert failed (${response.status})`);
    }
  } finally {
    window.clearTimeout(timer);
  }
}
