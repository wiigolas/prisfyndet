import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StatRow } from "@/components/StatRow";
import { Section } from "@/components/Section";
import { ScheduleTable } from "@/components/ScheduleTable";
import { getSchedule, getNewsPosts, getContact } from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const [weeklySchedule, newsPosts, contact] = await Promise.all([
    getSchedule(),
    getNewsPosts(),
    getContact(),
  ]);
  const latestPost = newsPosts[0];

  return (
    <>
      <PageHeader
        eyebrow={`${contact.address} · sedan ${contact.founded}`}
        title="Spel och serier i Uppsala"
        dek="Prisfyndet är ett självklart val för spel och serier i Uppsala — samlarkortspel, figurspel, rollspel, brädspel, amerikanska serier och manga. Och nästan varje kväll händer något i butiken."
      />

      <StatRow
        stats={[
          { value: String(contact.founded), label: "Grundades — snart 50 år i Uppsala" },
          { value: "Kungsg. 39", label: "Adress, nära resecentrum" },
          { value: "6/7", label: "Kvällar med schemalagd spelaktivitet" },
          { value: "WPN", label: "Officiell Wizards Play Network-butik" },
        ]}
      />

      <Section
        num="01"
        title="Den här veckan"
        dek="Ett fast schema, plus turneringar och drafter som läggs till löpande."
      >
        <ScheduleTable entries={weeklySchedule} />
        <p className="mt-6 text-sm text-ink-soft">
          Se kommande turneringar och anmäl dig på{" "}
          <Link href="/spelkvallar" className="text-red underline underline-offset-2">
            Spelkvällar &amp; turneringar
          </Link>
          .
        </p>
      </Section>

      {latestPost && (
        <Section num="02" title="Senaste nytt">
          <article>
            <p className="font-mono text-xs text-ink-faint mb-2">{latestPost.date}</p>
            <h3 className="font-display text-xl mb-2">{latestPost.title}</h3>
            <p className="text-ink-soft max-w-[62ch]">{latestPost.body}</p>
          </article>
          <p className="mt-6 text-sm text-ink-soft">
            Fler uppdateringar på{" "}
            <Link href="/nyheter" className="text-red underline underline-offset-2">
              Nyheter
            </Link>
            .
          </p>
        </Section>
      )}
    </>
  );
}
