import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw, Film, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

type Asset = { id: string; name: string; kind: string; storage_path: string; size_bytes: number; modified_at: string | null; url: string };

async function loadAssets(): Promise<Asset[]> {
  const { data, error } = await supabase.from("media_assets").select("*").order("modified_at", { ascending: false });
  if (error) throw error;
  if (!data?.length) return [];
  const { data: signed, error: sErr } = await supabase.storage
    .from("processed-media")
    .createSignedUrls(data.map((d) => d.storage_path), 60 * 60 * 6);
  if (sErr) throw sErr;
  return data.map((d, i) => ({ ...d, url: signed?.[i]?.signedUrl ?? "" }));
}

export default function Media() {
  const [syncing, setSyncing] = useState(false);
  const { data = [], isLoading, error, refetch } = useQuery({ queryKey: ["media"], queryFn: loadAssets, refetchInterval: 60_000 });

  const sync = async () => {
    setSyncing(true);
    const { data: res, error: err } = await supabase.functions.invoke("dropbox-sync");
    setSyncing(false);
    if (err) {
      const details = "context" in err ? await (err as { context: Response }).context.text().catch(() => err.message) : err.message;
      toast.error(`Sync failed: ${details}`);
      return;
    }
    toast.success(`Synced ${res.synced.length} file(s); ${res.remaining} still waiting`);
    refetch();
  };

  const videos = data.filter((a) => a.kind === "video");
  const covers = data.filter((a) => a.kind === "cover");

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Library" title="Processed Media" description="MP4s and cover JPEGs synced from Dropbox." />
      <div className="flex items-center gap-3">
        <Button onClick={sync} disabled={syncing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${syncing ? "animate-spin" : ""}`} /> {syncing ? "Syncing…" : "Sync now"}
        </Button>
        <span className="text-sm text-muted-foreground">{videos.length} videos · {covers.length} covers</span>
      </div>
      {isLoading && <p className="text-muted-foreground">Loading…</p>}
      {error && <p className="text-destructive">Couldn't load media: {(error as Error).message}</p>}
      {!isLoading && !data.length && <Card className="p-8 text-center text-muted-foreground">No media synced yet.</Card>}
      {videos.length > 0 && (
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 font-display text-xl"><Film className="h-5 w-5 text-primary" /> Videos</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <Card key={v.id} className="overflow-hidden">
                <video src={v.url} controls preload="metadata" playsInline className="aspect-[9/16] w-full bg-muted object-cover" />
                <p className="truncate p-3 text-sm">{v.name}</p>
              </Card>
            ))}
          </div>
        </section>
      )}
      {covers.length > 0 && (
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 font-display text-xl"><ImageIcon className="h-5 w-5 text-primary" /> Covers</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {covers.map((c) => (
              <Card key={c.id} className="overflow-hidden">
                <img src={c.url} alt={c.name} loading="lazy" className="aspect-[9/16] w-full object-cover" />
                <p className="truncate p-2 text-xs">{c.name}</p>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
