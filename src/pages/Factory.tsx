import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Plus, Lightbulb, Sparkles, CalendarCheck, Send, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns = [
  { id: "ideas", title: "Ideas", icon: Lightbulb, accent: "from-slate-500/20 to-transparent" },
  { id: "generated", title: "Generated", icon: Sparkles, accent: "from-primary/20 to-transparent" },
  { id: "scheduled", title: "Scheduled", icon: CalendarCheck, accent: "from-amber-500/20 to-transparent" },
  { id: "posted", title: "Posted", icon: Send, accent: "from-blue-500/20 to-transparent" },
  { id: "winners", title: "Viral Winners", icon: Trophy, accent: "from-rose-gold/30 to-transparent" },
];

type Card = { id: string; title: string; tag: string; metric?: string };

const initial: Record<string, Card[]> = {
  ideas: [
    { id: "1", title: "Lagos meal-prep series — 7 days", tag: "Meal Plans" },
    { id: "2", title: "Before/after carousel template", tag: "Fitness" },
  ],
  generated: [
    { id: "3", title: "POV hook: stop dieting like a celebrity", tag: "TikTok" },
    { id: "4", title: "Glute challenge — 6 slide carousel", tag: "Carousel" },
    { id: "5", title: "Pinterest pin: 5 Naija fat-loss meals", tag: "Pin" },
  ],
  scheduled: [
    { id: "6", title: "Elite NG ambassador open call", tag: "Recruitment", metric: "Tue 6:00pm" },
    { id: "7", title: "Figure-8 testimonial reel #12", tag: "Reels", metric: "Thu 8:00pm" },
  ],
  posted: [
    { id: "8", title: "Naija belly-fat meal hook v3", tag: "TikTok", metric: "240K views" },
  ],
  winners: [
    { id: "9", title: "She did figure-8 for 30 days…", tag: "TikTok", metric: "1.8M · 12% ER" },
    { id: "10", title: "POV finally found Naija meal plan", tag: "TikTok", metric: "2.4M · 9% ER" },
  ],
};

export default function Factory() {
  const [data] = useState(initial);

  return (
    <div>
      <PageHeader
        eyebrow="Content Factory"
        title="Production pipeline"
        description="Move ideas through the funnel until they hit viral. Drag-and-drop wiring comes once persistence is connected."
        actions={
          <Button className="rounded-xl bg-gradient-primary text-primary-foreground shadow-glow gap-2">
            <Plus className="h-4 w-4" /> New idea
          </Button>
        }
      />

      <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 pb-4">
        <div className="flex gap-4 min-w-max">
          {columns.map((col, ci) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.06, duration: 0.5 }}
              className="w-[300px] shrink-0"
            >
              <Card className={`rounded-2xl border-border/40 bg-gradient-to-b ${col.accent} backdrop-blur-sm h-full`}>
                <div className="p-4 flex items-center justify-between border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <col.icon className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">{col.title}</span>
                    <span className="text-xs text-muted-foreground bg-background/40 px-2 py-0.5 rounded-md">
                      {data[col.id]?.length ?? 0}
                    </span>
                  </div>
                  <button className="text-muted-foreground hover:text-primary text-xs">+</button>
                </div>
                <div className="p-3 space-y-2.5 min-h-[400px]">
                  {data[col.id]?.map((c, i) => (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: ci * 0.06 + i * 0.04, duration: 0.4 }}
                      className="p-3.5 rounded-xl bg-card/80 border border-border/50 hover:border-primary/40 transition-smooth cursor-grab active:cursor-grabbing group"
                    >
                      <div className="text-sm font-medium leading-snug group-hover:text-primary transition-smooth">{c.title}</div>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/60 text-muted-foreground">{c.tag}</span>
                        {c.metric && (
                          <span className="text-[10px] text-primary/80 font-medium">{c.metric}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
