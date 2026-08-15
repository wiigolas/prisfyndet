export function PageHeader({
  eyebrow,
  title,
  dek,
}: {
  eyebrow: string;
  title: string;
  dek?: string;
}) {
  return (
    <header className="mx-auto max-w-[960px] px-6 pt-16 pb-12">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-red flex items-center gap-2.5 mb-5">
        <span className="w-5 h-px bg-red inline-block" />
        {eyebrow}
      </p>
      <h1 className="font-display text-[clamp(32px,5vw,48px)] leading-[1.05] tracking-tight text-balance mb-4">
        {title}
      </h1>
      {dek && <p className="text-lg text-ink-soft max-w-[56ch]">{dek}</p>}
    </header>
  );
}
