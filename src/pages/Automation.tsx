import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Hash, Calendar, Repeat } from "lucide-react";
import { toast } from "sonner";

const schedule = [
  { day: "Mon", slots: ["10:00 — Hook drop", "18:00 — Carousel"] },
  { day: "Tue", slots: ["12:00 — Testimonial", "20:00 — Reel"] },
  { day: "Wed", slots: ["09:00 — Pin", "17:00 — CTA story"] },
  { day: "Thu", slots: ["11:00 — Hook drop", "19:00 — Recruitment"] },
  { day: "Fri", slots: ["10:00 — Promo", "21:00 — Viral remix"] },
  { day: "Sat", slots: ["12:00 — Story poll"] },
  { day: "Sun", slots: ["18:00 — Recap reel"] },
];

const hashtags = [
  "#ResoFlex", "#EliteNG", "#NaijaFitness", "#FigureEight", "#GluteGains",
  "#NigerianMealPlan", "#LagosFitness", "#AmbassadorOpportunity", "#AfricanWomenFitness",
  "#TransformationTuesday", "#SnatchedWaist", "#FitNaija",
];

const ctas = [
  "Comment 'ELITE' for the recruitment pack",
  "DM 'PLAN' to start the 6-week challenge",
  "Tap link in bio to join the global ambassador list",
  "Save this for your next meal prep Sunday",
  "Share with a friend who needs this transformation",
];

export default function Automation() {
  const exportCSV = () => toast.success("Caption pack exported", { description: "CSV ready for Metricool" });

  return (
    <div>
      <PageHeader
        eyebrow="Automation Center"
        title="Schedule, export, repeat"
        description="Generate posting schedules, export caption packs for Metricool, and manage your hashtag and CTA banks."
        actions={
          <>
            <Button variant="outline" className="rounded-xl border-border/60 gap-2">
              <FileText className="h-4 w-4" /> Export TXT
            </Button>
            <Button onClick={exportCSV} className="rounded-xl bg-gradient-primary text-primary-foreground shadow-glow gap-2">
              <Download className="h-4 w-4" /> Export Metricool CSV
            </Button>
          </>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass p-6 rounded-2xl border-border/40">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <h3 className="font-display text-2xl">Weekly schedule</h3>
            </div>
            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-primary gap-1.5">
              <Repeat className="h-3.5 w-3.5" /> Regenerate
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2.5">
            {schedule.map((d, i) => (
              <motion.div
                key={d.day}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-xl bg-secondary/30 border border-border/40 p-3 min-h-[150px] hover:border-primary/40 transition-smooth"
              >
                <div className="text-[10px] tracking-[0.25em] uppercase text-primary/80 mb-2">{d.day}</div>
                <div className="space-y-1.5">
                  {d.slots.map((s) => (
                    <div key={s} className="text-[11px] p-2 rounded-md bg-background/60 border border-border/40 leading-snug">
                      {s}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="glass p-6 rounded-2xl border-border/40">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="h-4 w-4 text-primary" />
            <h3 className="font-display text-2xl">Hashtag bank</h3>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {hashtags.map((h) => (
              <span key={h} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary">
                {h}
              </span>
            ))}
          </div>

          <div className="text-[10px] tracking-[0.25em] uppercase text-primary/80 mb-2">CTA bank</div>
          <div className="space-y-2">
            {ctas.map((c) => (
              <div key={c} className="text-[13px] p-2.5 rounded-lg bg-secondary/30 border border-border/40 hover:border-primary/40 transition-smooth cursor-pointer">
                {c}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
