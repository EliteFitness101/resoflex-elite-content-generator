import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
    >
      <div>
        {eyebrow && (
          <div className="text-[11px] tracking-[0.3em] uppercase text-primary/80 mb-3">{eyebrow}</div>
        )}
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05]">
          <span className="text-gradient-gold">{title}</span>
        </h1>
        {description && (
          <p className="text-muted-foreground mt-3 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
    </motion.div>
  );
}
