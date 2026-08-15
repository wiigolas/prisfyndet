import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type {
  ScheduleEntry,
  Category,
  OpeningHoursRow,
  Contact,
  NewsPost,
} from "@/content/site";
import {
  weeklySchedule as fallbackSchedule,
  categories as fallbackCategories,
  openingHours as fallbackHours,
  contact as fallbackContact,
  newsPosts as fallbackNews,
} from "@/content/site";

// Om Firestore inte svarar (nätverk, saknat dokument) faller sidorna tillbaka
// på det inbyggda innehållet i src/content/site.ts, så sajten aldrig går sönder.

export async function getSchedule(): Promise<ScheduleEntry[]> {
  try {
    const snap = await getDoc(doc(db, "content", "schedule"));
    return snap.exists() ? (snap.data().entries as ScheduleEntry[]) : fallbackSchedule;
  } catch {
    return fallbackSchedule;
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const snap = await getDoc(doc(db, "content", "categories"));
    return snap.exists() ? (snap.data().items as Category[]) : fallbackCategories;
  } catch {
    return fallbackCategories;
  }
}

export async function getOpeningHours(): Promise<OpeningHoursRow[]> {
  try {
    const snap = await getDoc(doc(db, "content", "hours"));
    return snap.exists() ? (snap.data().rows as OpeningHoursRow[]) : fallbackHours;
  } catch {
    return fallbackHours;
  }
}

export async function getContact(): Promise<Contact> {
  try {
    const snap = await getDoc(doc(db, "content", "contact"));
    return snap.exists() ? (snap.data() as Contact) : fallbackContact;
  } catch {
    return fallbackContact;
  }
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  try {
    const snap = await getDocs(query(collection(db, "news"), orderBy("date", "desc")));
    return snap.empty ? fallbackNews : snap.docs.map((d) => d.data() as NewsPost);
  } catch {
    return fallbackNews;
  }
}
