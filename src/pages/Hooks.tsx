import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Heart, Copy, Flame } from "lucide-react";
import { toast } from "sonner";

const tags = ["All", "Fitness", "Meal Plans", "Recruitment", "Glute", "Ambassador", "Hook", "CTA"];

const hooks = [
  { text: "POV: You found the only Naija meal plan that actually works.", tag: "Meal Plans", type: "Hook", score: 96 },
  { text: "Stop scrolling. The figure-8 method changed everything.", tag: "Glute", type: "Hook", score: 94 },
  { text: "Comment 'ELITE' to get the recruitment pack instantly.", tag: "Recruitment", type: "CTA", score: 89 },
  { text: "She lost 14kg eating jollof. Here's exactly how.", tag: "Fitness", type: "Hook", score: 92 },
  { text: "3 reasons every African woman needs ResoFlex this year.", tag: "Fitness", type: "Hook", score: 87 },
  { text: "DM 'AMBASSADOR' for global access — closing Friday.", tag: "Ambassador", type: "CTA", score: 90 },
  { text: "Day 1 vs Day 30: figure-8 transformation no one believed.", tag: "Glute", type: "Hook", score: 95 },
  { text: "If you're a Naija woman over 25, watch this before bed.", tag: "Fitness", type: "Hook", score: 88 },
  { text: "The Elite NG income breakdown they don't show you.", tag: "Recruitment", type: "Hook", score: 91 },
  { text: "Tag a friend who needs this Lagos-friendly meal prep.", tag: "Meal Plans", type: "CTA", score: 84 },
  { text: "I made ₦1.4M in 90 days as an Elite NG ambassador.", tag: "Ambassador", type: "Hook", score: 93 },
  { text: "Why your glutes won't grow (and 3 fixes for African women).", tag: "Glute", type: "Hook", score: 86 },
];

export default function Hooks() {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return hooks.filter((h) => {
      const matchTag = active === "All" || h.tag === active || h.type === active;
      const matchQ = !q || h.text.toLowerCase().includes(q.toLowerCase());
      return matchTag && matchQ;
    });
  }, [active, q]);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Hook Library"
        title="The viral arsenal"
        description="Searchable bank of proven hooks and CTAs. Remix top performers into new variants and reuse across formats."
      />

      <Card className="glass p-5 rounded-2xl border-border/40 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search hooks, CTAs, niches…"
              className="pl-9 bg-secondary/30 border-border/60 h-11 rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-smooth ${
                  active === t
                    ? "bg-gradient-primary text-primary-foreground border-transparent shadow-glow"
                    : "bg-secondary/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((h, i) => (
          <motion.div
            key={h.text}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
          >
            <Card className="glass p-5 rounded-2xl border-border/40 hover:border-primary/40 transition-smooth group h-full flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] tracking-[0.25em] uppercase text-primary/80">{h.type}</span>
                <span className="flex items-center gap-1 text-[11px] text-amber-400">
                  <Flame className="h-3 w-3" /> {h.score}
                </span>
              </div>
              <p className="text-[15px] font-medium leading-snug flex-1">{h.text}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/60 text-muted-foreground">{h.tag}</span>
                <div className="flex gap-1">
                  <button className="h-7 w-7 rounded-lg hover:bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-primary transition-smooth">
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => copy(h.text)} className="h-7 w-7 rounded-lg hover:bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-primary transition-smooth">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
