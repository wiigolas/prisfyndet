export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 px-[18px] py-4 bg-surface border-l-[3px] border-red text-[14.5px] text-ink-soft">
      <b className="text-ink font-semibold">{title}</b> {children}
    </div>
  );
}
