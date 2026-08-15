import { PageHeader } from "@/components/PageHeader";
import { newsPosts } from "@/content/site";

export const metadata = {
  title: "Nyheter",
  description: "Nya varor och uppdateringar från Prisfyndet.",
};

export default function NyheterPage() {
  return (
    <>
      <PageHeader eyebrow="Nyheter" title="Nya varor och uppdateringar" />
      <div className="mx-auto max-w-[960px] px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8">
          <div className="hidden md:block" />
          <ul className="flex flex-col gap-10">
            {newsPosts.map((post) => (
              <li key={post.slug} className="border-b border-line pb-10 last:border-b-0 last:pb-0">
                <p className="font-mono text-xs text-ink-faint mb-2">{post.date}</p>
                <h2 className="font-display text-xl mb-2">{post.title}</h2>
                <p className="text-ink-soft max-w-[62ch]">{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
