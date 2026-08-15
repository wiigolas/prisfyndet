export function Section({
  num,
  title,
  dek,
  children,
}: {
  num: string;
  title: string;
  dek?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-line last:border-b-0">
      <div className="mx-auto max-w-[960px] px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8 mb-8">
          <span className="font-mono text-[13px] text-ink-faint pt-1.5">{num}</span>
          <div>
            <h2 className="font-display text-2xl md:text-[28px] leading-tight mb-2 text-balance">
              {title}
            </h2>
            {dek && <p className="text-ink-soft text-[15.5px] max-w-[62ch]">{dek}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8">
          <div className="hidden md:block" />
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
