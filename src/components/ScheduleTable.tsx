import type { ScheduleEntry } from "@/content/site";

const statusLabel: Record<ScheduleEntry["status"], string> = {
  recurring: "Återkommande",
  varies: "Varierar",
  closed: "Stängt",
};

export function ScheduleTable({ entries }: { entries: ScheduleEntry[] }) {
  return (
    <div className="border-t border-line-strong">
      {entries.map((entry) => (
        <div
          key={entry.day}
          className="grid grid-cols-[110px_1fr_auto] sm:grid-cols-[120px_1fr_auto] items-baseline gap-4 py-3.5 border-b border-line"
        >
          <span className="font-mono text-[13.5px] font-medium uppercase tracking-wide text-ink-faint">
            {entry.day}
          </span>
          <span className="text-[15px]">{entry.activity}</span>
          <span
            className={`hidden sm:inline-flex font-mono text-[11px] uppercase tracking-wide px-2 py-0.5 rounded-[3px] whitespace-nowrap ${
              entry.status === "recurring"
                ? "bg-green-tint text-green"
                : "border border-line-strong text-ink-faint"
            }`}
          >
            {statusLabel[entry.status]}
          </span>
        </div>
      ))}
    </div>
  );
}
