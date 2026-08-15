type Stat = { value: string; label: string };

export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="border-b border-line-strong">
      <div className="mx-auto max-w-[960px] px-6 grid grid-cols-2 sm:grid-cols-5">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-5 pl-4 sm:pl-4 ${i === 0 ? "pl-0" : ""} border-l border-line first:border-l-0`}
          >
            <span className="block font-mono font-semibold text-[clamp(18px,2.4vw,24px)] tabular-nums tracking-tight mb-1">
              {stat.value}
            </span>
            <span className="block text-[12.5px] text-ink-soft leading-snug">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
