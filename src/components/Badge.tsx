export function Badge({ tone, children }: { tone: "open" | "full" | "neutral"; children: React.ReactNode }) {
  const cls =
    tone === "open"
      ? "bg-green-tint text-green"
      : tone === "full"
        ? "bg-red-tint text-red"
        : "border border-line-strong text-ink-faint";
  return (
    <span
      className={`inline-flex items-center font-mono text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-[3px] whitespace-nowrap ${cls}`}
    >
      {children}
    </span>
  );
}
