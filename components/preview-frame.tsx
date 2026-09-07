"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function PreviewFrame({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`group overflow-hidden rounded-2xl border border-accent-soft bg-surface shadow-md hover:shadow-2xl hover:border-accent-2 transition-all ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-accent-soft bg-surface-hover px-4 py-3 group-hover:bg-accent-soft transition-colors">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-2" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-accent-3" />
        {label && (
          <span className="ml-2 font-mono truncate text-xs font-bold text-ink-muted group-hover:text-accent-2 transition-colors">{label}</span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}
