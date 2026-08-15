"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllEvents, saveEvent, deleteEvent, type TournamentEvent } from "@/lib/events";

const emptyDraft = {
  title: "",
  date: "",
  time: "18:00",
  format: "",
  capacity: 16,
  fee: 0,
  description: "",
};

export default function TurneringarAdminPage() {
  const [events, setEvents] = useState<TournamentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function refresh() {
    setEvents(await getAllEvents());
    setLoading(false);
  }

  useEffect(() => {
    async function run() {
      setEvents(await getAllEvents());
      setLoading(false);
    }
    run();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.title || !draft.date) return;
    await saveEvent(editingId ? { ...draft, id: editingId } : draft);
    setDraft(emptyDraft);
    setEditingId(null);
    refresh();
  }

  function startEdit(event: TournamentEvent) {
    setEditingId(event.id);
    setDraft({
      title: event.title,
      date: event.date,
      time: event.time,
      format: event.format,
      capacity: event.capacity,
      fee: event.fee,
      description: event.description,
    });
  }

  async function handleDelete(id: string) {
    await deleteEvent(id);
    refresh();
  }

  const inputCls =
    "border border-line-strong bg-surface px-3 py-2 rounded-[3px] text-sm outline-none focus:border-red w-full";

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="font-display text-xl mb-4">
          {editingId ? "Redigera event" : "Nytt event"}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[600px]">
          <input
            className={inputCls}
            placeholder="Titel"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
          />
          <input
            className={inputCls}
            placeholder="Format (t.ex. Standard RCQ)"
            value={draft.format}
            onChange={(e) => setDraft({ ...draft, format: e.target.value })}
          />
          <input
            className={inputCls}
            type="date"
            value={draft.date}
            onChange={(e) => setDraft({ ...draft, date: e.target.value })}
          />
          <input
            className={inputCls}
            type="time"
            value={draft.time}
            onChange={(e) => setDraft({ ...draft, time: e.target.value })}
          />
          <input
            className={inputCls}
            type="number"
            min={1}
            placeholder="Platser"
            value={draft.capacity}
            onChange={(e) => setDraft({ ...draft, capacity: Number(e.target.value) })}
          />
          <input
            className={inputCls}
            type="number"
            min={0}
            placeholder="Avgift (kr)"
            value={draft.fee}
            onChange={(e) => setDraft({ ...draft, fee: Number(e.target.value) })}
          />
          <textarea
            className={`${inputCls} sm:col-span-2`}
            placeholder="Beskrivning (valfritt)"
            rows={2}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          />
          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              className="font-mono text-xs uppercase tracking-wide bg-ink text-bg px-4 py-2 rounded-[3px]"
            >
              {editingId ? "Spara ändringar" : "Skapa event"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setDraft(emptyDraft);
                }}
                className="font-mono text-xs uppercase tracking-wide text-ink-faint"
              >
                Avbryt
              </button>
            )}
          </div>
        </form>
      </section>

      <section>
        <h2 className="font-display text-xl mb-4">Alla event</h2>
        {loading ? (
          <p className="text-sm text-ink-faint">Laddar…</p>
        ) : (
          <ul className="flex flex-col gap-px bg-line border border-line">
            {events.map((event) => (
              <li key={event.id} className="bg-surface px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-[15px]">{event.title}</p>
                  <p className="text-sm text-ink-soft mt-0.5">
                    {event.date} · {event.time} · {event.format} ·{" "}
                    <Link href={`/admin/turneringar/${event.id}`} className="text-red underline underline-offset-2">
                      {event.registeredCount}/{event.capacity} anmälda
                    </Link>
                  </p>
                </div>
                <div className="flex gap-4 font-mono text-xs uppercase tracking-wide">
                  <button onClick={() => startEdit(event)} className="text-ink-soft hover:text-ink">
                    Redigera
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="text-ink-faint hover:text-red">
                    Ta bort
                  </button>
                </div>
              </li>
            ))}
            {events.length === 0 && (
              <li className="bg-surface px-5 py-4 text-sm text-ink-faint">Inga event ännu.</li>
            )}
          </ul>
        )}
      </section>
    </div>
  );
}
