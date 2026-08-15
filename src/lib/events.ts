import {
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type TournamentEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // t.ex. "18:00"
  format: string;
  capacity: number;
  fee: number; // kr, 0 = gratis
  description: string;
  registeredCount: number;
};

export type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  registeredAt: string;
};

const eventsRef = collection(db, "events");

export async function getUpcomingEvents(): Promise<TournamentEvent[]> {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const snap = await getDocs(
      query(eventsRef, where("date", ">=", today), orderBy("date", "asc"))
    );
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as TournamentEvent);
  } catch {
    return [];
  }
}

export async function getAllEvents(): Promise<TournamentEvent[]> {
  const snap = await getDocs(query(eventsRef, orderBy("date", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as TournamentEvent);
}

export async function getEvent(id: string): Promise<TournamentEvent | null> {
  const snap = await getDoc(doc(db, "events", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as TournamentEvent) : null;
}

export async function getRegistrations(eventId: string): Promise<Registration[]> {
  const snap = await getDocs(
    query(collection(db, "events", eventId, "registrations"), orderBy("registeredAt", "asc"))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Registration);
}

// Skapar anmälan + höjer registeredCount i samma atomiska batch.
// Säkerhetsreglerna nekar skrivningen om eventet redan är fullt, så
// det här kan aldrig oversälja platser även vid samtidiga anmälningar.
export async function register(
  eventId: string,
  data: { name: string; email: string; phone: string }
) {
  const batch = writeBatch(db);
  const regRef = doc(collection(db, "events", eventId, "registrations"));
  batch.set(regRef, { ...data, registeredAt: new Date().toISOString() });
  batch.update(doc(db, "events", eventId), { registeredCount: increment(1) });
  await batch.commit();
}

export async function saveEvent(
  event: Omit<TournamentEvent, "id" | "registeredCount"> & { id?: string }
) {
  const { id, ...data } = event;
  if (id) {
    // merge: true — rör aldrig registeredCount, det styrs bara av register().
    await setDoc(doc(db, "events", id), data, { merge: true });
  } else {
    const ref = doc(eventsRef);
    await setDoc(ref, { ...data, registeredCount: 0 });
  }
}

export async function deleteEvent(id: string) {
  await deleteDoc(doc(db, "events", id));
}
