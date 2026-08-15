import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { ScheduleTable } from "@/components/ScheduleTable";
import { Callout } from "@/components/Callout";
import { Badge } from "@/components/Badge";
import { getSchedule, getContact } from "@/lib/content";
import { getUpcomingEvents } from "@/lib/events";

export const metadata = {
  title: "Spelkvällar & turneringar",
  description: "Prisfyndets återkommande spelkvällar och turneringar i Uppsala.",
};

export const revalidate = 60;

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default async function SpelkvallarPage() {
  const [weeklySchedule, contact, events] = await Promise.all([
    getSchedule(),
    getContact(),
    getUpcomingEvents(),
  ]);
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
        title="Kommande turneringar"
        dek="Anmäl dig direkt — inget konto behövs."
      >
        {events.length === 0 ? (
          <p className="text-sm text-ink-soft">
            Inga anmälningsbara turneringar just nu. Håll utkik på{" "}
            <a href={contact.facebook} target="_blank" rel="noreferrer" className="text-red underline underline-offset-2">
              Facebook
            </a>{" "}
            eller kom förbi i butiken.
          </p>
        ) : (
          <ul className="flex flex-col gap-px bg-line border border-line">
            {events.map((event) => {
              const full = event.registeredCount >= event.capacity;
              return (
                <li key={event.id} className="bg-surface px-5 py-4">
                  <Link href={`/spelkvallar/${event.id}`} className="flex flex-wrap items-center justify-between gap-3">
                    <span>
                      <span className="block font-semibold text-[15px]">{event.title}</span>
                      <span className="block text-sm text-ink-soft mt-0.5">
                        {formatDate(event.date)} · {event.time} · {event.format}
                        {event.fee > 0 ? ` · ${event.fee} kr` : " · Gratis"}
                      </span>
                    </span>
                    <Badge tone={full ? "full" : "open"}>
                      {full ? "Fullbokad" : `${event.capacity - event.registeredCount} platser kvar`}
                    </Badge>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-6 text-sm text-ink-soft">
          Följ även{" "}
          <a href={contact.facebook} target="_blank" rel="noreferrer" className="text-red underline underline-offset-2">
            Facebook
          </a>{" "}
          för allt som händer löpande.
        </p>
      </Section>
    </>
  );
}
