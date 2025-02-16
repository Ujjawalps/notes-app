import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

// ✅ Add Note
export const addNote = async (title, content, userId) => {
  try {
    const notesRef = collection(db, "notes");
    await addDoc(notesRef, { title, content, userId, createdAt: new Date() });
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

// ✅ Get Notes
export const getNotes = async (userId) => {
  try {
    const notesRef = collection(db, "notes");
    const q = query(notesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

// ✅ Update Note (Fixing Missing Export)
export const updateNote = async (noteId, title, content) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, { title, content });
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

// ✅ Delete Note
export const deleteNote = async (noteId) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await deleteDoc(noteRef);
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
