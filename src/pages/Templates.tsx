import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Plus } from "lucide-react";

const templates = [
  { name: "IG Carousel · Luxe", ratio: "4/5", category: "Carousel", gradient: "from-rose-gold/30 via-rose-gold-dark/20 to-background" },
  { name: "TikTok Cover · Bold", ratio: "9/16", category: "Cover", gradient: "from-amber-500/30 via-rose-gold/20 to-background" },
  { name: "Story · Quote Card", ratio: "9/16", category: "Story", gradient: "from-rose-gold-light/30 via-pink-500/20 to-background" },
  { name: "Pinterest Pin · Editorial", ratio: "2/3", category: "Pin", gradient: "from-champagne/30 via-rose-gold/20 to-background" },
  { name: "Testimonial · Glass", ratio: "1/1", category: "Testimonial", gradient: "from-rose-gold/40 via-rose-gold-dark/20 to-background" },
  { name: "Promo · Launch", ratio: "1/1", category: "Promo", gradient: "from-amber-400/30 via-rose-gold-light/20 to-background" },
  { name: "Carousel · Before/After", ratio: "4/5", category: "Carousel", gradient: "from-pink-500/30 via-rose-gold/20 to-background" },
  { name: "Reel Cover · Minimal", ratio: "9/16", category: "Cover", gradient: "from-rose-gold-dark/40 via-amber-700/20 to-background" },
];

export default function Templates() {
  return (
    <div>
      <PageHeader
        eyebrow="Visual Studio"
        title="Branded templates"
        description="Glass morphism + luxury black/rose-gold templates. Edit, duplicate, and export ready-to-post visuals."
        actions={
          <Button className="rounded-xl bg-gradient-primary text-primary-foreground shadow-glow gap-2">
            <Plus className="h-4 w-4" /> New template
          </Button>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {templates.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <Card className="glass rounded-2xl border-border/40 overflow-hidden hover:border-primary/40 transition-smooth group cursor-pointer">
              <div
                className={`relative bg-gradient-to-br ${t.gradient} flex items-center justify-center overflow-hidden`}
                style={{ aspectRatio: t.ratio.replace("/", " / ") }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.3),transparent_60%)]" />
                <div className="absolute inset-4 rounded-2xl glass-strong flex flex-col justify-between p-4">
                  <div className="text-[9px] tracking-[0.3em] uppercase text-primary/90">ResoFlex × Elite NG</div>
                  <div>
                    <div className="font-display text-2xl text-gradient-gold leading-none">Reshape</div>
                    <div className="font-display text-2xl text-foreground/90 leading-none">your story.</div>
                    <div className="mt-3 h-px bg-gradient-to-r from-primary/60 to-transparent" />
                    <div className="text-[10px] text-muted-foreground mt-2">Glute · Figure-8 · 6 weeks</div>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-background/40 backdrop-blur-sm flex items-center justify-center transition-smooth">
                  <Button size="sm" className="rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">Edit template</Button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{t.category} · {t.ratio}</div>
                </div>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
