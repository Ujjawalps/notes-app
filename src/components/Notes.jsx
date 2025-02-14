import { useState, useEffect } from "react";
import { databases, databaseID, collectionID } from "../appwriteConfig";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import { ID, Query } from "appwrite";
import "../styles/Notes.css";
import { useUserContext } from '../context/UserContext'; // Import UserContext

const Notes = ({ onLogout }) => { // Remove user prop
  const user = useUserContext();  // Get user from context

  if (!user) { // Handle loading state
    return <div>Loading user data...</div>;
  }

  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNoteId, setExpandedNoteId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await databases.listDocuments(
          databaseID,
          collectionID,
          [Query.equal("userId", user.$id)] // Use user from context
        );
        console.log("Fetched Notes:", response.documents);
        setNotes(response.documents);
      } catch (error) {
        console.error("Error fetching notes:", error);
        alert("Error fetching notes. Please try again later."); // User-friendly message
      }
    };

    fetchNotes();
  }, [user]); // Re-fetch when user changes

  useEffect(() => {
    console.log("Notes in State:", notes);
  }, [notes]);

  const handleSearch = () => {
    if (searchTerm.length < 3) return;

    const filteredNotes = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setNotes(filteredNotes);
  };

  return (
    <div className="notes-page">
      {/* ... (rest of your JSX - header, search, NoteForm, NotesList) */}

       {editMode && editNote ? (
          <NoteForm
            user={user} // Pass user to NoteForm
            isEditing={true}
            noteId={editNote.$id}
            initialTitle={editNote.title}
            initialContent={editNote.content}
            onSave={async (title, content, noteId) => {
              try {
                await databases.updateDocument(
                  databaseID,
                  collectionID,
                  noteId,
                  { title, content }
                );
                console.log("Note Updated:", title, content);

                setNotes((prevNotes) =>
                  prevNotes.map(note =>
                    note.$id === noteId ? { ...note, title, content } : note
                  )
                );

                setEditMode(false);
                setEditNote(null);
              } catch (error) {
                console.error("Error updating note:", error);
                alert("Error updating note. Please try again later."); // User-friendly message
              }
            }}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <NoteForm
            user={user} // Pass user to NoteForm
            isEditing={false}
            onSave={(newNote) => {
              setNotes((prevNotes) => [...prevNotes, newNote]);
            }}
          />
        )}

      {/* ... */}

    </div>
  );
};

export default Notes;