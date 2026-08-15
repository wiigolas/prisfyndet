import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { CategoryGrid } from "@/components/CategoryGrid";
import { categories } from "@/content/site";

export const metadata = {
  title: "Sortiment",
  description: "Vad Prisfyndet säljer — serier, manga, samlarkortspel, figurspel, rollspel och brädspel.",
};

export default function SortimentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sortiment"
        title="Brett snarare än nischat"
        dek="Ett urval av vad vi har i hyllorna. Hela sortimentet ser du bäst i butiken — men här är en bra bild innan du går dit."
      />
      <Section num="01" title="Kategorier">
        <CategoryGrid categories={categories} />
      </Section>
    </>
  );
}
