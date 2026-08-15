"use client";

import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { NewsPost } from "@/content/site";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function NyheterAdminPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function load() {
    const snap = await getDocs(query(collection(db, "news"), orderBy("date", "desc")));
    setPosts(snap.docs.map((d) => d.data() as NewsPost));
    setLoading(false);
  }

  useEffect(() => {
    async function run() {
      const snap = await getDocs(query(collection(db, "news"), orderBy("date", "desc")));
      setPosts(snap.docs.map((d) => d.data() as NewsPost));
      setLoading(false);
    }
    run();
  }, []);

  async function addPost(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const post: NewsPost = {
      slug: `${slugify(title)}-${Date.now()}`,
      title,
      body,
      date: new Date().toISOString().slice(0, 10),
    };
    await setDoc(doc(db, "news", post.slug), post);
    setTitle("");
    setBody("");
    load();
  }

  async function removePost(slug: string) {
    await deleteDoc(doc(db, "news", slug));
    load();
  }

  return (
    <div className="flex flex-col gap-12">
      <section>
        <h2 className="font-display text-xl mb-4">Nytt inlägg</h2>
        <form onSubmit={addPost} className="flex flex-col gap-3 max-w-[560px]">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Rubrik"
            className="border border-line-strong bg-surface px-3 py-2 rounded-[3px] text-sm outline-none focus:border-red"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Text"
            rows={4}
            className="border border-line-strong bg-surface px-3 py-2 rounded-[3px] text-sm outline-none focus:border-red resize-y"
          />
          <button
            type="submit"
            className="self-start font-mono text-xs uppercase tracking-wide bg-ink text-bg px-4 py-2 rounded-[3px]"
          >
            Publicera
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-display text-xl mb-4">Publicerade inlägg</h2>
        {loading ? (
          <p className="text-ink-faint text-sm">Laddar…</p>
        ) : (
          <ul className="flex flex-col gap-px bg-line border border-line">
            {posts.map((post) => (
              <li key={post.slug} className="bg-surface px-4 py-3 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-ink-faint mb-1">{post.date}</p>
                  <p className="font-semibold text-sm">{post.title}</p>
                  <p className="text-sm text-ink-soft mt-1 max-w-[60ch]">{post.body}</p>
                </div>
                <button
                  onClick={() => removePost(post.slug)}
                  className="font-mono text-xs text-ink-faint hover:text-red whitespace-nowrap"
                >
                  Ta bort
                </button>
              </li>
            ))}
            {posts.length === 0 && (
              <li className="bg-surface px-4 py-3 text-sm text-ink-faint">Inga inlägg än.</li>
            )}
          </ul>
        )}
      </section>
    </div>
  );
}
