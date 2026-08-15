import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/Badge";
import { RegistrationForm } from "@/components/RegistrationForm";
import { getEvent } from "@/lib/events";

export const revalidate = 0;

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default async function EventPage(props: PageProps<"/spelkvallar/[eventId]">) {
  const { eventId } = await props.params;
  const event = await getEvent(eventId);
  if (!event) notFound();

  const full = event.registeredCount >= event.capacity;

  return (
    <>
      <PageHeader
        eyebrow={`${formatDate(event.date)} · ${event.time}`}
        title={event.title}
        dek={event.description || undefined}
      />
      <div className="mx-auto max-w-[960px] px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-8">
          <div className="hidden md:block" />
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-mono text-ink-faint">{event.format}</span>
              <span className="font-mono text-ink-faint">
                {event.fee > 0 ? `${event.fee} kr` : "Gratis"}
              </span>
              <Badge tone={full ? "full" : "open"}>
                {full
                  ? "Fullbokad"
                  : `${event.capacity - event.registeredCount} av ${event.capacity} platser kvar`}
              </Badge>
            </div>
            <RegistrationForm eventId={event.id} full={full} />
            <Link href="/spelkvallar" className="text-sm text-ink-soft underline underline-offset-2">
              ← Alla spelkvällar &amp; turneringar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
