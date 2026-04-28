import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Eye, UserPlus, ShoppingBag, Flame, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

const trend = [
  { day: "Mon", views: 120000, leads: 320 },
  { day: "Tue", views: 240000, leads: 510 },
  { day: "Wed", views: 180000, leads: 420 },
  { day: "Thu", views: 410000, leads: 980 },
  { day: "Fri", views: 620000, leads: 1340 },
  { day: "Sat", views: 880000, leads: 1820 },
  { day: "Sun", views: 1240000, leads: 2210 },
];

const formats = [
  { name: "TikTok", value: 62 },
  { name: "Reels", value: 51 },
  { name: "Carousel", value: 38 },
  { name: "Pin", value: 22 },
  { name: "Story", value: 18 },
];

const stats = [
  { label: "Views (7d)", value: "3.7M", icon: Eye, delta: "+82%" },
  { label: "Leads", value: "7,610", icon: UserPlus, delta: "+34%" },
  { label: "Sales", value: "₦14.2M", icon: ShoppingBag, delta: "+41%" },
  { label: "Avg viral score", value: "87", icon: Flame, delta: "+6 pts" },
];

const topPatterns = [
  { pattern: "POV-style hook + Naija context + transformation visual", score: 96, count: 14 },
  { pattern: "Day 1 vs Day 30 carousel + figure-8 keyword", score: 93, count: 11 },
  { pattern: "₦ income breakdown + Elite NG recruitment CTA", score: 91, count: 9 },
  { pattern: "Lagos-meal photo + caption hook + 'comment word' CTA", score: 88, count: 8 },
];

export default function Analytics() {
  return (
    <div>
      <PageHeader
        eyebrow="Performance"
        title="What's actually working"
        description="Track views, leads, sales and viral score across formats. Surface repeatable patterns to scale aggressively."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.5 }}>
            <Card className="glass p-5 rounded-2xl border-border/40">
              <div className="flex items-center justify-between mb-3">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="text-xs text-emerald-400">{s.delta}</span>
              </div>
              <div className="font-display text-3xl">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2 glass p-6 rounded-2xl border-border/40">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-2xl">Reach this week</h3>
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "hsl(var(--muted-foreground))" }}
                />
                <Area type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass p-6 rounded-2xl border-border/40">
          <h3 className="font-display text-2xl mb-4">Format performance</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formats}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="glass p-6 rounded-2xl border-border/40">
        <h3 className="font-display text-2xl mb-1">Winning patterns</h3>
        <p className="text-sm text-muted-foreground mb-5">Repeatable structures behind your top-performing content.</p>
        <div className="space-y-3">
          {topPatterns.map((p, i) => (
            <motion.div
              key={p.pattern}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="p-4 rounded-xl bg-secondary/30 border border-border/40 hover:border-primary/40 transition-smooth flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-display text-lg shadow-glow shrink-0">
                {p.score}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{p.pattern}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.count} viral assets used this pattern</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
