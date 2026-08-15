import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { contact } from "@/content/site";

export const metadata = {
  title: "Om Prisfyndet",
  description: "Historien om Prisfyndet — spel- och seriebutik i Uppsala sedan 1977.",
};

export default function OmPage() {
  return (
    <>
      <PageHeader eyebrow="Om Prisfyndet" title="En pigg butik, snart 50 år" />
      <Section num="01" title="Historien sedan 1977">
        <div className="prose max-w-[66ch] text-[15.5px] space-y-4">
          <p>
            Prisfyndet är en butik för spel och serier på {contact.address}, ett par minuters
            promenad från resecentrum. Butiken grundades {contact.founded} — det här är alltså
            inte ett nytt varumärke som ska hitta sin röst, utan en institution i Uppsalas spel-
            och seriekultur.
          </p>
          <p>
            Vi tillhandahåller spel och serier till både entusiaster och nybörjare: amerikanska
            serier, manga, samlarkortspel, figurspel, rollspel och brädspel — och nästan varje
            kväll händer något i butiken, från Magic-drafter till Warhammer-kvällar.
          </p>
          <p>Varmt välkomna in till oss och titta runt!</p>
        </div>
      </Section>
    </>
  );
}
