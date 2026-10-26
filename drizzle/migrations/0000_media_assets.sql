CREATE TABLE public.media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dropbox_path text NOT NULL UNIQUE,
  dropbox_rev text NOT NULL,
  name text NOT NULL,
  kind text NOT NULL,
  storage_path text NOT NULL,
  size_bytes bigint NOT NULL DEFAULT 0,
  modified_at timestamptz,
  synced_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.media_assets TO anon, authenticated;
GRANT ALL ON public.media_assets TO service_role;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Processed media is publicly viewable" ON public.media_assets FOR SELECT TO anon, authenticated USING (true);