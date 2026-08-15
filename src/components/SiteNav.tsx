import Link from "next/link";

const links = [
  { href: "/", label: "Hem" },
  { href: "/om", label: "Om" },
  { href: "/sortiment", label: "Sortiment" },
  { href: "/spelkvallar", label: "Spelkvällar & turneringar" },
  { href: "/nyheter", label: "Nyheter" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteNav() {
  return (
    <header className="border-b border-line-strong">
      <div className="mx-auto max-w-[960px] px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg tracking-tight">
          Prisfyndet
        </Link>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[13px] uppercase tracking-wide text-ink-soft">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
