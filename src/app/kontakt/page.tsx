import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { getContact, getOpeningHours } from "@/lib/content";

export const metadata = {
  title: "Kontakt",
  description: "Adress, öppettider och kontaktuppgifter till Prisfyndet i Uppsala.",
};

export const revalidate = 60;

export default async function KontaktPage() {
  const [contact, openingHours] = await Promise.all([getContact(), getOpeningHours()]);
  return (
    <>
      <PageHeader eyebrow="Kontakt" title="Hitta till oss" />
      <Section num="01" title="Kontaktuppgifter">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <dl className="space-y-5 text-[15px]">
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-1">Adress</dt>
              <dd>{contact.address}</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-1">Telefon</dt>
              <dd>
                <a href={`tel:${contact.phone.replace(/\s|-/g, "")}`} className="text-red underline underline-offset-2">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-1">E-post</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className="text-red underline underline-offset-2">
                  {contact.email}
                </a>
              </dd>
            </div>
          </dl>
          <dl className="space-y-3 text-[15px]">
            <dt className="font-mono text-xs uppercase tracking-wide text-ink-faint mb-1">Öppettider</dt>
            {openingHours.map((row) => (
              <div key={row.days} className="flex justify-between gap-4 border-b border-line pb-2">
                <dd className="text-ink-soft">{row.days}</dd>
                <dd className="font-mono tabular-nums">{row.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
