"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function BadgePill({ children, dotColor }: { children: ReactNode; dotColor?: string }) {
  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2 rounded-full border border-accent-soft bg-surface-hover px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-2 shadow-sm"
    >
      <span
        aria-hidden
        className="h-2 w-2 rounded-full animate-pulse"
        style={{ background: dotColor ?? "var(--accent)" }}
      />
      {children}
    </motion.span>
  );
}
