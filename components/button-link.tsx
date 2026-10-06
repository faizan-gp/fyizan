import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./icons";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  small = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  arrow?: boolean;
  small?: boolean;
}) {
  const className = ["btn", variant === "ghost" ? "ghost" : "", small ? "sm" : ""].filter(Boolean).join(" ");
  return (
    <Link href={href} className={className}>
      {children}
      {arrow && <Icon name="arrow" />}
    </Link>
  );
}
