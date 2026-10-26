import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const DEFAULT_LINK =
  "https://www.dropbox.com/scl/fo/vha60gk9c9c56njhypmcp/AKf-rjdEuNwmoFhZHYPHzHA?rlkey=dv1ehsf89qxwcr0c2k58xtaev&dl=0";
const BUCKET = "processed-media";
const MAX_FILES_PER_RUN = 4;

type Entry = { ".tag": string; name: string; path_lower?: string; rev?: string; size?: number; server_modified?: string; id?: string };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

function kindOf(name: string): "video" | "cover" | null {
  const n = name.toLowerCase();
  if (n.endsWith(".mp4")) return "video";
  if (n.endsWith(".jpg") || n.endsWith(".jpeg")) return "cover";
  return null;
}

async function dropboxToken() {
  const key = Deno.env.get("DROPBOX_APP_KEY");
  const secret = Deno.env.get("DROPBOX_APP_SECRET");
  const refresh = Deno.env.get("DROPBOX_REFRESH_TOKEN");
  if (!key || !secret || !refresh) throw new Error("Dropbox credentials are not configured");
  const res = await fetch("https://api.dropboxapi.com/oauth2/token", {
    method: "POST",
    headers: { Authorization: `Basic ${btoa(`${key}:${secret}`)}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
  });
  if (!res.ok) throw new Error(`Dropbox token [${res.status}]: ${await res.text()}`);
  return (await res.json()).access_token as string;
}

async function listAll(token: string, url: string, path: string, out: { entry: Entry; path: string }[]) {
  let res = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ path, shared_link: { url } }),
  });
  while (true) {
    if (!res.ok) throw new Error(`Dropbox list [${res.status}]: ${await res.text()}`);
    const data = await res.json();
    for (const e of data.entries as Entry[]) {
      const p = `${path}/${e.name}`;
      if (e[".tag"] === "folder") await listAll(token, url, p, out);
      else if (e[".tag"] === "file" && kindOf(e.name)) out.push({ entry: e, path: p });
    }
    if (!data.has_more) break;
    res = await fetch("https://api.dropboxapi.com/2/files/list_folder/continue", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ cursor: data.cursor }),
    });
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const db = createClient(supabaseUrl, serviceKey);
    const link = Deno.env.get("DROPBOX_SHARED_LINK") || DEFAULT_LINK;
    const token = await dropboxToken();

    const files: { entry: Entry; path: string }[] = [];
    await listAll(token, link, "", files);

    const { data: existing, error: exErr } = await db.from("media_assets").select("dropbox_path, dropbox_rev");
    if (exErr) throw new Error(exErr.message);
    const known = new Map((existing ?? []).map((r) => [r.dropbox_path, r.dropbox_rev]));
    const pending = files
      .filter((f) => known.get(f.path.toLowerCase()) !== f.entry.rev)
      .sort((a, b) => (b.entry.server_modified ?? "").localeCompare(a.entry.server_modified ?? ""));

    const synced: string[] = [];
    const failed: { path: string; error: string }[] = [];
    for (const f of pending.slice(0, MAX_FILES_PER_RUN)) {
      try {
        const dl = await fetch("https://content.dropboxapi.com/2/sharing/get_shared_link_file", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Dropbox-API-Arg": JSON.stringify({ url: link, path: f.path }) },
        });
        if (!dl.ok || !dl.body) throw new Error(`download [${dl.status}]: ${await dl.text()}`);
        const kind = kindOf(f.entry.name)!;
        const storagePath = `dropbox${f.path.toLowerCase().replace(/[^a-z0-9/._-]/g, "-")}`;
        const up = await fetch(`${supabaseUrl}/storage/v1/object/${BUCKET}/${storagePath}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${serviceKey}`,
            apikey: serviceKey,
            "Content-Type": kind === "video" ? "video/mp4" : "image/jpeg",
            "x-upsert": "true",
          },
          body: dl.body,
          // @ts-ignore Deno streaming upload
          duplex: "half",
        });
        if (!up.ok) throw new Error(`storage [${up.status}]: ${await up.text()}`);
        const { error } = await db.from("media_assets").upsert(
          {
            dropbox_path: f.path.toLowerCase(),
            dropbox_rev: f.entry.rev ?? "",
            name: f.entry.name,
            kind,
            storage_path: storagePath,
            size_bytes: f.entry.size ?? 0,
            modified_at: f.entry.server_modified ?? null,
            synced_at: new Date().toISOString(),
          },
          { onConflict: "dropbox_path" },
        );
        if (error) throw new Error(error.message);
        synced.push(f.path);
      } catch (e) {
        console.error("sync failed", f.path, e);
        failed.push({ path: f.path, error: String(e instanceof Error ? e.message : e) });
      }
    }
    return json({ found: files.length, remaining: Math.max(0, pending.length - synced.length), synced, failed });
  } catch (e) {
    console.error(e);
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
