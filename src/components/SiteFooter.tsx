import { getContact } from "@/lib/content";

export async function SiteFooter() {
  const contact = await getContact();
  return (
    <footer className="border-t border-line-strong">
      <div className="mx-auto max-w-[960px] px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-[13px] text-ink-faint font-mono">
        <span>© Prisfyndet, sedan {contact.founded}</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <span>{contact.address}</span>
          <a href={`tel:${contact.phone.replace(/\s|-/g, "")}`} className="hover:text-ink-soft">
            {contact.phone}
          </a>
          <a href={contact.facebook} className="hover:text-ink-soft" target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}
