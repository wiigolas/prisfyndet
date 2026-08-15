import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { ScheduleTable } from "@/components/ScheduleTable";
import { Callout } from "@/components/Callout";
import { getSchedule, getContact } from "@/lib/content";

export const metadata = {
  title: "Spelkvällar & turneringar",
  description: "Prisfyndets återkommande spelkvällar och turneringar i Uppsala.",
};

export const revalidate = 60;

export default async function SpelkvallarPage() {
  const [weeklySchedule, contact] = await Promise.all([getSchedule(), getContact()]);
  return (
    <>
      <PageHeader
        eyebrow="Spelkvällar & turneringar"
        title="Något händer nästan varje kväll"
        dek="Ett fast veckoschema, plus sanktionerade turneringar som Regional Championship Qualifiers i Magic."
      />
      <Section num="01" title="Veckoschema">
        <ScheduleTable entries={weeklySchedule} />
        <Callout title="Utöver veckoschemat">
          är Prisfyndet en officiell Wizards Play Network-butik och arrangör på Unity League,
          vilket betyder att vi kör sanktionerade Magic-evenemang som RCQ:er (Regional
          Championship Qualifiers) — riktiga, anmälningspliktiga turneringar med startavgift och
          platsbegränsning.
        </Callout>
      </Section>
      <Section
        num="02"
        title="Anmälan till turneringar"
        dek="En egen kalender med anmälan direkt på sajten är på gång. Tills dess, håll utkik på Facebook eller ring butiken."
      >
        <a
          href={contact.facebook}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-red underline underline-offset-2"
        >
          Se kommande event på Facebook →
        </a>
      </Section>
    </>
  );
}
