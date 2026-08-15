"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch {
      setError("Fel e-post eller lösenord.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-[400px] px-6 py-24">
      <h1 className="font-display text-2xl mb-8">Logga in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">Lösenord</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-line-strong bg-surface px-3 py-2 rounded-[3px] outline-none focus:border-red"
          />
        </label>
        {error && <p className="text-sm text-red">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-ink text-bg font-mono text-sm uppercase tracking-wide py-2.5 rounded-[3px] disabled:opacity-50"
        >
          {loading ? "Loggar in…" : "Logga in"}
        </button>
      </form>
    </div>
  );
}
