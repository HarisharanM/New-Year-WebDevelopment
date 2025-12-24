import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  serverTimestamp,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

/* ================= SAVE PARTICIPANT ================= */
export async function saveParticipant(data) {
  try {
    console.log("🔥 Attempting Firebase save:", data);

    const docRef = await addDoc(collection(db, "participants"), {
      ...data,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Firebase saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Firebase save failed:", error);
    throw error;
  }
}

/* ================= GET ALL PARTICIPANTS ================= */
export async function getAllParticipants() {
  try {
    const snapshot = await getDocs(collection(db, "participants"));
    return snapshot.docs.map((docSnap) => ({
      participantId: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    return [];
  }
}

/* ================= GET PARTICIPANT BY ID (FOR TICKET PAGE & SCAN) ================= */
export async function getParticipantById(participantId) {
  try {
    const docRef = doc(db, "participants", participantId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn("⚠️ No participant found:", participantId);
      return null;
    }

    return {
      participantId: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error("❌ Error fetching participant:", error);
    return null;
  }
}

/* ================= UPDATE PARTICIPANT (SCAN PASS) ================= */
export async function updateParticipant(participantId, updates) {
  try {
    const docRef = doc(db, "participants", participantId);
    await updateDoc(docRef, updates);
    console.log("✅ Participant updated:", participantId);
  } catch (error) {
    console.error("❌ Update failed:", error);
    throw error;
  }
}

/* ================= GET USER TICKETS (MY TICKETS PAGE) ================= */
export async function getUserTickets(userId) {
  try {
    const q = query(
      collection(db, "participants"),
      where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((docSnap) => ({
      participantId: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("❌ Error fetching user tickets:", error);
    return [];
  }
}

