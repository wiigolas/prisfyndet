import type { Category } from "@/content/site";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
      {categories.map((cat) => (
        <div key={cat.name} className="bg-surface px-5 py-[18px]">
          <h3 className="font-mono font-semibold text-[13.5px] mb-1.5">{cat.name}</h3>
          <p className="text-sm text-ink-soft">{cat.description}</p>
        </div>
      ))}
    </div>
  );
}
