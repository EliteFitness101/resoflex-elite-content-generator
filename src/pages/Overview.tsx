import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Eye, Heart, ArrowUpRight, Flame, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "Assets generated", value: "1,284", delta: "+18.4%", icon: Sparkles },
  { label: "Total reach", value: "12.4M", delta: "+62%", icon: Eye },
  { label: "Viral winners", value: "47", delta: "+9", icon: Trophy },
  { label: "Engagement rate", value: "8.7%", delta: "+1.2pt", icon: Heart },
];

const categories = [
  { name: "Fitness Transformation", count: 412, color: "from-rose-gold to-rose-gold-light" },
  { name: "Nigerian Meal Plans", count: 238, color: "from-amber-500 to-rose-gold" },
  { name: "Glute & Figure-8", count: 196, color: "from-pink-500 to-rose-gold-dark" },
  { name: "Elite NG Recruitment", count: 174, color: "from-rose-gold-dark to-amber-700" },
  { name: "Global Ambassadors", count: 98, color: "from-amber-400 to-rose-gold-light" },
];

const winners = [
  { hook: "POV: You finally found a Naija meal plan that actually melts belly fat 🔥", views: "2.4M", category: "Meal Plans" },
  { hook: "She did the figure-8 method for 30 days. The results broke TikTok.", views: "1.8M", category: "Glute Training" },
  { hook: "3 reasons Lagos women are joining Elite NG every single week", views: "940K", category: "Recruitment" },
];

export default function Overview() {
  return (
    <div>
      <PageHeader
        eyebrow="Command Center"
        title="Welcome back, Anointed."
        description="Your viral content engine is producing at scale. 12 campaigns live, 47 winners this month, and tracking toward the ₦1B annual goal."
        actions={
          <>
            <Button variant="outline" className="rounded-xl border-border/60">View report</Button>
            <Link to="/generator">
              <Button className="rounded-xl bg-gradient-primary text-primary-foreground shadow-glow gap-2">
                <Sparkles className="h-4 w-4" /> Generate content
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="glass p-5 rounded-2xl border-border/40 hover:border-primary/30 transition-smooth group relative overflow-hidden">
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-smooth" />
              <div className="flex items-center justify-between mb-3 relative">
                <div className="h-9 w-9 rounded-xl bg-secondary/60 flex items-center justify-center text-primary border border-border/40">
                  <s.icon className="h-4 w-4" />
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                  <ArrowUpRight className="h-3 w-3" /> {s.delta}
                </span>
              </div>
              <div className="font-display text-3xl font-semibold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass p-6 rounded-2xl border-border/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary/80 mb-1">Trending</div>
              <h3 className="font-display text-2xl">Viral winners this week</h3>
            </div>
            <Flame className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-3">
            {winners.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="group p-4 rounded-xl bg-secondary/30 border border-border/40 hover:border-primary/40 hover:bg-secondary/50 transition-smooth flex items-start gap-4 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium leading-snug group-hover:text-primary transition-smooth">{w.hook}</div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 rounded-md bg-background/60 border border-border/40">{w.category}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {w.views}</span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-smooth" />
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="glass p-6 rounded-2xl border-border/40">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary/80 mb-1">Niches</div>
              <h3 className="font-display text-2xl">Active verticals</h3>
            </div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-4">
            {categories.map((c, i) => {
              const max = Math.max(...categories.map(x => x.count));
              const pct = (c.count / max) * 100;
              return (
                <div key={c.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{c.name}</span>
                    <span className="text-muted-foreground text-xs">{c.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
