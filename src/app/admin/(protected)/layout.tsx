"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";

const links = [
  { href: "/admin", label: "Översikt" },
  { href: "/admin/innehall", label: "Sidinnehåll" },
  { href: "/admin/turneringar", label: "Turneringar" },
  { href: "/admin/nyheter", label: "Nyheter" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/admin/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return <div className="mx-auto max-w-[960px] px-6 py-24 text-ink-faint">Laddar…</div>;
  }

  return (
    <div className="mx-auto max-w-[960px] px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-line-strong">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[13px] uppercase tracking-wide">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
                  ? "text-red"
                  : "text-ink-soft hover:text-ink"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => signOut(auth)}
          className="font-mono text-[13px] text-ink-faint hover:text-ink"
        >
          Logga ut ({user.email})
        </button>
      </div>
      {children}
    </div>
  );
}
