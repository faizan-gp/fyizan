"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function PillButton({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const isPrimary = variant === "primary";
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      passHref
      legacyBehavior
    >
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`group relative inline-flex items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-bold transition-all shadow-md hover:shadow-xl ${
          isPrimary
            ? "bg-gradient-to-r from-accent to-accent-2 text-white border-none"
            : "border-2 border-accent-2 bg-surface text-ink hover:bg-accent-soft"
        }`}
      >
        {children}
        <span
          aria-hidden
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm transition-transform group-hover:translate-x-1 ${
            isPrimary ? "bg-white text-accent-2 shadow-sm" : "bg-gradient-to-r from-accent to-accent-2 text-white"
          }`}
        >
          <ArrowRight size={16} strokeWidth={3} />
        </span>
      </motion.a>
    </Link>
  );
}
