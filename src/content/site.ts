// Innehållet här är strukturerat som framtida Firestore-dokument (se docs/plan.html, fas 2).
// Tills adminsidan finns bor det som typade konstanter, men formen är densamma.

export type ScheduleEntry = {
  day: string;
  activity: string;
  status: "recurring" | "varies" | "closed";
};

export const weeklySchedule: ScheduleEntry[] = [
  { day: "Måndag", activity: "Magic-kväll, varierande format", status: "recurring" },
  { day: "Tisdag", activity: "Warhammer-kväll", status: "recurring" },
  { day: "Onsdag", activity: "Kortspelskväll — Riftbound, Magic Premodern", status: "recurring" },
  { day: "Torsdag", activity: "Flesh and Blood samt Pokémon", status: "recurring" },
  { day: "Fredag", activity: "Magic — Commander & Draft", status: "recurring" },
  { day: "Lördag", activity: "Ingen fast aktivitet, men ofta något på gång", status: "varies" },
  { day: "Söndag", activity: "Stängt", status: "closed" },
];

export type Category = {
  name: string;
  description: string;
};

export const categories: Category[] = [
  { name: "Serier & manga", description: "Amerikanska serier (Marvel, DC, Image m.fl.) och manga på engelska." },
  { name: "Samlarkortspel", description: "Magic: the Gathering, Yu-Gi-Oh, Pokémon, Riftbound, Flesh and Blood." },
  { name: "Kortspelstillbehör", description: "UltraPro, Dragon Shield, Ultimate Guard, KMC, Gamegenic." },
  { name: "Figurspel", description: "Games Workshop, med tillbehör från Citadel, Vallejo, Army Painter." },
  { name: "Rollspel", description: "Dungeons & Dragons, Pathfinder, Fria Ligan." },
  { name: "Brädspel", description: "Hundratals titlar från en lång rad förlag." },
];

export const openingHours = [
  { days: "Måndag–Fredag", hours: "11:00–19:00" },
  { days: "Lördag", hours: "11:00–17:00" },
  { days: "Söndag", hours: "Stängt" },
];

export const contact = {
  address: "Kungsgatan 39, Uppsala",
  phone: "018-10 66 07",
  email: "prisfyndet@gmail.com",
  facebook: "https://www.facebook.com/Prisfyndet/",
  founded: 1977,
};

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  body: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "valkommen-till-nya-sajten",
    title: "Vi har fått en riktig hemsida",
    date: "2026-08-15",
    body: "Efter många år på enbart Facebook har Prisfyndet nu ett eget hem på nätet. Håll utkik här för nya varor, spelkvällar och turneringar.",
  },
];
