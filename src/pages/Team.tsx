import { motion } from "framer-motion";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Plus, Shield } from "lucide-react";

const team = [
  { name: "Anointed Okorie", role: "Admin", initials: "AO", status: "Online" },
  { name: "Chidinma Eze", role: "Content Lead", initials: "CE", status: "Online" },
  { name: "Tomi Adeyemi", role: "Visual Designer", initials: "TA", status: "Idle" },
  { name: "Funmi Bello", role: "Copywriter", initials: "FB", status: "Offline" },
  { name: "Kemi Olu", role: "Scheduler", initials: "KO", status: "Online" },
];

const statusColor: Record<string, string> = {
  Online: "bg-emerald-500",
  Idle: "bg-amber-400",
  Offline: "bg-muted-foreground/40",
};

export default function Team() {
  return (
    <div>
      <PageHeader
        eyebrow="Team & Access"
        title="Roles & permissions"
        description="Admin and content creator roles. Real auth wires in once Lovable Cloud is enabled."
        actions={
          <Button className="rounded-xl bg-gradient-primary text-primary-foreground shadow-glow gap-2">
            <Plus className="h-4 w-4" /> Invite member
          </Button>
        }
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((m, i) => (
          <motion.div key={m.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }}>
            <Card className="glass p-5 rounded-2xl border-border/40 hover:border-primary/40 transition-smooth">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-gold flex items-center justify-center text-primary-foreground font-semibold shadow-soft">
                    {m.initials}
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card ${statusColor[m.status]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium flex items-center gap-1.5">
                    {m.name}
                    {m.role === "Admin" && <Crown className="h-3.5 w-3.5 text-primary" />}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Shield className="h-3 w-3" /> {m.role}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
