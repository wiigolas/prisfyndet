// Engångsskript: fyller Firestore med startinnehållet.
// Körs med: npx tsx scripts/seed.ts

process.loadEnvFile(".env.local");

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, writeBatch } from "firebase/firestore";
import {
  weeklySchedule,
  categories,
  openingHours,
  contact,
  newsPosts,
} from "../src/content/site";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

async function seed() {
  await setDoc(doc(db, "content", "schedule"), { entries: weeklySchedule });
  await setDoc(doc(db, "content", "categories"), { items: categories });
  await setDoc(doc(db, "content", "hours"), { rows: openingHours });
  await setDoc(doc(db, "content", "contact"), contact);

  const batch = writeBatch(db);
  for (const post of newsPosts) {
    batch.set(doc(db, "news", post.slug), post);
  }
  await batch.commit();

  console.log("Seed klar.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
