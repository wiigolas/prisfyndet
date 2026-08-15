"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getEvent, getRegistrations, type TournamentEvent, type Registration } from "@/lib/events";

export default function RegistrationsPage() {
  const params = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<TournamentEvent | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      const [e, regs] = await Promise.all([
        getEvent(params.eventId),
        getRegistrations(params.eventId),
      ]);
      setEvent(e);
      setRegistrations(regs);
      setLoading(false);
    }
    run();
  }, [params.eventId]);

  if (loading) return <p className="text-sm text-ink-faint">Laddar…</p>;
  if (!event) return <p className="text-sm text-ink-faint">Eventet finns inte.</p>;

  return (
    <div>
      <Link href="/admin/turneringar" className="text-sm text-ink-soft underline underline-offset-2">
        ← Alla event
      </Link>
      <h2 className="font-display text-xl mt-4 mb-1">{event.title}</h2>
      <p className="text-sm text-ink-soft mb-6">
        {event.date} · {event.time} · {registrations.length}/{event.capacity} anmälda
      </p>
      <ul className="flex flex-col gap-px bg-line border border-line">
        {registrations.map((r) => (
          <li key={r.id} className="bg-surface px-5 py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 text-sm">
            <span className="font-semibold">{r.name}</span>
            <a href={`mailto:${r.email}`} className="text-red underline underline-offset-2">
              {r.email}
            </a>
            <span className="text-ink-soft">{r.phone || "—"}</span>
          </li>
        ))}
        {registrations.length === 0 && (
          <li className="bg-surface px-5 py-3 text-sm text-ink-faint">Inga anmälningar än.</li>
        )}
      </ul>
    </div>
  );
}
