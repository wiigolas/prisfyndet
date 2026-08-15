"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ScheduleEntry, Category, OpeningHoursRow, Contact } from "@/content/site";
import {
  weeklySchedule as fallbackSchedule,
  categories as fallbackCategories,
  openingHours as fallbackHours,
  contact as fallbackContact,
} from "@/content/site";

function SaveButton({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button
      onClick={onClick}
      className="font-mono text-xs uppercase tracking-wide bg-ink text-bg px-4 py-2 rounded-[3px]"
    >
      {saved ? "Sparat ✓" : "Spara"}
    </button>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="border border-line-strong bg-surface px-2.5 py-1.5 rounded-[3px] text-sm outline-none focus:border-red w-full"
    />
  );
}

export default function InnehallPage() {
  const [loading, setLoading] = useState(true);

  const [schedule, setSchedule] = useState<ScheduleEntry[]>(fallbackSchedule);
  const [scheduleSaved, setScheduleSaved] = useState(false);

  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [categoriesSaved, setCategoriesSaved] = useState(false);

  const [hours, setHours] = useState<OpeningHoursRow[]>(fallbackHours);
  const [hoursSaved, setHoursSaved] = useState(false);

  const [contact, setContact] = useState<Contact>(fallbackContact);
  const [contactSaved, setContactSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const [s, c, h, k] = await Promise.all([
        getDoc(doc(db, "content", "schedule")),
        getDoc(doc(db, "content", "categories")),
        getDoc(doc(db, "content", "hours")),
        getDoc(doc(db, "content", "contact")),
      ]);
      if (s.exists()) setSchedule(s.data().entries);
      if (c.exists()) setCategories(c.data().items);
      if (h.exists()) setHours(h.data().rows);
      if (k.exists()) setContact(k.data() as Contact);
      setLoading(false);
    }
    load();
  }, []);

  async function saveSchedule() {
    await setDoc(doc(db, "content", "schedule"), { entries: schedule });
    setScheduleSaved(true);
    setTimeout(() => setScheduleSaved(false), 2000);
  }
  async function saveCategories() {
    await setDoc(doc(db, "content", "categories"), { items: categories });
    setCategoriesSaved(true);
    setTimeout(() => setCategoriesSaved(false), 2000);
  }
  async function saveHours() {
    await setDoc(doc(db, "content", "hours"), { rows: hours });
    setHoursSaved(true);
    setTimeout(() => setHoursSaved(false), 2000);
  }
  async function saveContact() {
    await setDoc(doc(db, "content", "contact"), contact);
    setContactSaved(true);
    setTimeout(() => setContactSaved(false), 2000);
  }

  if (loading) return <p className="text-ink-faint">Laddar…</p>;

  return (
    <div className="flex flex-col gap-14">
      {/* Veckoschema */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Veckoschema</h2>
          <SaveButton onClick={saveSchedule} saved={scheduleSaved} />
        </div>
        <div className="flex flex-col gap-2">
          {schedule.map((entry, i) => (
            <div key={i} className="grid grid-cols-[110px_1fr_130px] gap-2 items-center">
              <TextInput
                value={entry.day}
                onChange={(v) =>
                  setSchedule(schedule.map((e, j) => (j === i ? { ...e, day: v } : e)))
                }
              />
              <TextInput
                value={entry.activity}
                onChange={(v) =>
                  setSchedule(schedule.map((e, j) => (j === i ? { ...e, activity: v } : e)))
                }
              />
              <select
                value={entry.status}
                onChange={(e) =>
                  setSchedule(
                    schedule.map((s, j) =>
                      j === i ? { ...s, status: e.target.value as ScheduleEntry["status"] } : s
                    )
                  )
                }
                className="border border-line-strong bg-surface px-2 py-1.5 rounded-[3px] text-sm"
              >
                <option value="recurring">Återkommande</option>
                <option value="varies">Varierar</option>
                <option value="closed">Stängt</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* Sortiment */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Sortiment</h2>
          <SaveButton onClick={saveCategories} saved={categoriesSaved} />
        </div>
        <div className="flex flex-col gap-2">
          {categories.map((cat, i) => (
            <div key={i} className="grid grid-cols-[180px_1fr_auto] gap-2 items-center">
              <TextInput
                value={cat.name}
                onChange={(v) =>
                  setCategories(categories.map((c, j) => (j === i ? { ...c, name: v } : c)))
                }
              />
              <TextInput
                value={cat.description}
                onChange={(v) =>
                  setCategories(
                    categories.map((c, j) => (j === i ? { ...c, description: v } : c))
                  )
                }
              />
              <button
                onClick={() => setCategories(categories.filter((_, j) => j !== i))}
                className="text-ink-faint hover:text-red text-sm px-2"
              >
                Ta bort
              </button>
            </div>
          ))}
          <button
            onClick={() => setCategories([...categories, { name: "", description: "" }])}
            className="self-start font-mono text-xs uppercase tracking-wide text-ink-soft hover:text-ink mt-1"
          >
            + Lägg till kategori
          </button>
        </div>
      </section>

      {/* Öppettider */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Öppettider</h2>
          <SaveButton onClick={saveHours} saved={hoursSaved} />
        </div>
        <div className="flex flex-col gap-2">
          {hours.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr] gap-2">
              <TextInput
                value={row.days}
                onChange={(v) => setHours(hours.map((r, j) => (j === i ? { ...r, days: v } : r)))}
              />
              <TextInput
                value={row.hours}
                onChange={(v) =>
                  setHours(hours.map((r, j) => (j === i ? { ...r, hours: v } : r)))
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* Kontakt */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl">Kontaktuppgifter</h2>
          <SaveButton onClick={saveContact} saved={contactSaved} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[600px]">
          <TextInput value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} placeholder="Adress" />
          <TextInput value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} placeholder="Telefon" />
          <TextInput value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} placeholder="E-post" />
          <TextInput value={contact.facebook} onChange={(v) => setContact({ ...contact, facebook: v })} placeholder="Facebook-URL" />
        </div>
      </section>
    </div>
  );
}
