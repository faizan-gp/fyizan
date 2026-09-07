export function StatChip({
  value,
  label,
  variant = "accent",
  className = "",
}: {
  value: string;
  label: string;
  variant?: "accent" | "surface";
  className?: string;
}) {
  return (
    <div
      className={`w-fit rounded-2xl px-5 py-4 shadow-lg ${
        variant === "accent" ? "bg-accent text-white" : "border border-border bg-surface text-ink"
      } ${className}`}
    >
      <p className="font-display text-2xl font-black">{value}</p>
      <p className={`mt-0.5 text-xs font-medium ${variant === "accent" ? "text-white/80" : "text-ink-muted"}`}>
        {label}
      </p>
    </div>
  );
}
