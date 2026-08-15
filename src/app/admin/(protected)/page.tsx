import Link from "next/link";

export default function AdminHome() {
  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Adminöversikt</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
        <Link href="/admin/innehall" className="bg-surface px-5 py-5 hover:bg-surface-raised">
          <h2 className="font-mono font-semibold text-sm mb-1.5">Sidinnehåll</h2>
          <p className="text-sm text-ink-soft">
            Veckoschema, öppettider, sortiment och kontaktuppgifter.
          </p>
        </Link>
        <Link href="/admin/nyheter" className="bg-surface px-5 py-5 hover:bg-surface-raised">
          <h2 className="font-mono font-semibold text-sm mb-1.5">Nyheter</h2>
          <p className="text-sm text-ink-soft">Lägg till, redigera och ta bort nyhetsinlägg.</p>
        </Link>
      </div>
      <p className="mt-8 text-sm text-ink-faint">
        Ändringar syns på sajten inom en minut (sidorna cachas kort).
      </p>
    </div>
  );
}
