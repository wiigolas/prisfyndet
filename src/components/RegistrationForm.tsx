"use client";

import { useState } from "react";
import { register } from "@/lib/events";

export function RegistrationForm({ eventId, full }: { eventId: string; full: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      await register(eventId, { name, email, phone });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="bg-green-tint text-green px-5 py-4 rounded-[3px] text-sm">
        Du är anmäld! Vi hörs i butiken.
      </div>
    );
  }

  if (full) {
    return (
      <div className="bg-surface border border-line-strong px-5 py-4 rounded-[3px] text-sm text-ink-soft">
        Turneringen är fullbokad. Kom förbi eller ring butiken om du vill stå på väntelista.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[420px]">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">Namn</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-line-strong bg-surface px-3 py-2 rounded-[3px] outline-none focus:border-red"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">E-post</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-line-strong bg-surface px-3 py-2 rounded-[3px] outline-none focus:border-red"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">Telefon (valfritt)</span>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-line-strong bg-surface px-3 py-2 rounded-[3px] outline-none focus:border-red"
        />
      </label>
      {status === "error" && (
        <p className="text-sm text-red">Något gick fel — försök igen eller ring butiken.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start bg-ink text-bg font-mono text-xs uppercase tracking-wide px-5 py-2.5 rounded-[3px] disabled:opacity-50"
      >
        {status === "sending" ? "Anmäler…" : "Anmäl mig"}
      </button>
    </form>
  );
}
