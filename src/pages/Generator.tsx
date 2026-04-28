import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, RefreshCw, Wand2, Check } from "lucide-react";
import { toast } from "sonner";

const niches = [
  "Fitness Transformation",
  "Nigerian Meal Plans",
  "Glute & Figure-8 Training",
  "Elite NG Recruitment",
  "Global Ambassador Program",
];

const types = [
  { id: "tiktok", label: "TikTok Hooks" },
  { id: "reels", label: "Reels Scripts" },
  { id: "carousel", label: "Carousel Slides" },
  { id: "cta", label: "CTA Captions" },
  { id: "pin", label: "Pinterest Pins" },
  { id: "testimonial", label: "Testimonials" },
];

// Mock generator content
const seedHooks = [
  "POV: You stop dieting and start eating like a Naija auntie who knows the secret.",
  "She did the figure-8 method for 21 days. The before/after broke the algorithm.",
  "Stop scrolling — this is the meal plan that snatched 12,000+ Lagos waists this year.",
  "Why every Elite NG ambassador wakes up at 5am (and you should too).",
  "3 viral red flags in fitness TikTok — and what actually works for African women.",
  "I tried the ResoFlex routine for 30 days. My glutes filed a thank-you note.",
  "The recruitment offer Lagos didn't see coming. Open globally. Limited spots.",
];

export default function Generator() {
  const [theme, setTheme] = useState("Glute & figure-8 training for Naija women");
  const [niche, setNiche] = useState(niches[2]);
  const [type, setType] = useState("tiktok");
  const [results, setResults] = useState<string[]>(seedHooks.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      const shuffled = [...seedHooks].sort(() => Math.random() - 0.5).slice(0, 6);
      setResults(shuffled);
      setLoading(false);
      toast.success("6 fresh assets generated", { description: `${niche} • ${types.find(t => t.id === type)?.label}` });
    }, 900);
  };

  const copy = (text: string, i: number) => {
    navigator.clipboard.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <PageHeader
        eyebrow="AI Content Generator"
        title="Generate viral assets in seconds"
        description="Pick a vertical, describe the campaign, and produce hooks, scripts, captions and visuals tuned for ResoFlex × Elite NG growth."
      />

      <div className="grid lg:grid-cols-[380px_1fr] gap-6">
        {/* Left controls */}
        <Card className="glass p-6 rounded-2xl border-border/40 h-fit lg:sticky lg:top-24">
          <div className="space-y-5">
            <div>
              <Label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Niche</Label>
              <div className="flex flex-wrap gap-2">
                {niches.map((n) => (
                  <button
                    key={n}
                    onClick={() => setNiche(n)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-smooth ${
                      niche === n
                        ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
                        : "bg-secondary/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Asset type</Label>
              <div className="grid grid-cols-2 gap-2">
                {types.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`text-sm px-3 py-2.5 rounded-xl border transition-smooth text-left ${
                      type === t.id
                        ? "bg-primary/10 border-primary/50 text-primary"
                        : "bg-secondary/30 border-border/60 hover:border-primary/30"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Campaign theme</Label>
              <Textarea
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                rows={4}
                className="bg-secondary/30 border-border/60 rounded-xl resize-none"
                placeholder="e.g. Launch promo for figure-8 6-week challenge"
              />
            </div>

            <Button
              onClick={generate}
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow gap-2 font-medium"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
              {loading ? "Conjuring…" : "Generate 6 assets"}
            </Button>
            <p className="text-[11px] text-muted-foreground/70 text-center">Backend AI model wires in once Lovable Cloud is enabled.</p>
          </div>
        </Card>

        {/* Right results */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Generated for</span>
              <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 rounded-md">{niche}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={generate} className="text-muted-foreground hover:text-primary gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" /> Remix
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {results.map((r, i) => (
                <motion.div
                  key={r + i}
                  layout
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card className="glass p-5 rounded-2xl border-border/40 hover:border-primary/40 transition-smooth h-full flex flex-col group relative overflow-hidden">
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-primary/80">Hook · 0{i + 1}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground">Score {Math.floor(70 + Math.random() * 28)}</span>
                    </div>
                    <p className="text-[15px] leading-snug font-medium flex-1">{r}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
                      <div className="flex gap-1">
                        {["Fitness", "Naija", "Viral"].slice(0, 2 + (i % 2)).map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/60 text-muted-foreground">{t}</span>
                        ))}
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => copy(r, i)} className="h-8 gap-1.5 text-xs hover:text-primary">
                        {copied === i ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied === i ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
