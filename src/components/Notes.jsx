import { useState, useEffect } from "react";
import { databases, databaseID, collectionID } from "../appwriteConfig";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import { ID, Query } from "appwrite";
import "../styles/Notes.css";
import { useUserContext } from '../context/UserContext';

const Notes = ({ onLogout }) => {
  const user = useUserContext();
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (user && user.$id) {
      setIsLoadingUser(false);
      const fetchNotes = async () => {
        try {
          const response = await databases.listDocuments(
            databaseID,
            collectionID,
            [Query.equal("userId", user.$id)]
          );
          console.log("Fetched Notes:", response.documents);
          setNotes(response.documents);
        } catch (error) {
          console.error("Error fetching notes:", error);
          alert("Error fetching notes. Please try again later.");
        }
      };

      fetchNotes();
    } else if (user === null) {
      setIsLoadingUser(false);
    } else {
      console.log("User not yet loaded, skipping fetchNotes");
      setNotes([]);
      setIsLoadingUser(true);
    }
  }, [user]);

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

  if (isLoadingUser) {
    return <div>Loading your notes...</div>;
  }

  return (
    <div className="notes-page">
      <header className="notes-header">
        <h1>Notes App</h1>
        <hr />
        <div className="user-info">
          <span>Welcome, {user.name ? user.name : user.email}</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <section className="notes-section">
        <h2>Notes</h2>

        {editMode && editNote ? (
          <NoteForm
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
                alert("Error updating note. Please try again later.");
              }
            }}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <NoteForm
            isEditing={false}
            onSave={(newNote) => {
              setNotes((prevNotes) => [...prevNotes, newNote]);
            }}
          />
        )}

        <div className="search-container">
          <input
            type="text"
            placeholder="Search Notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={() => handleSearch()}>
            Search
          </button>
          <button className="search-btn mobile" onClick={() => handleSearch()}>
            🔍
          </button>
        </div>

        <NotesList
          notes={notes}
          onEdit={(note) => {
            setEditMode(true);
            setEditNote(note);
            setExpandedNoteId(null);
          }}
          onDelete={(noteId) => {
            setNotes(notes.filter((note) => note.$id !== noteId));
          }}
          expandedNoteId={expandedNoteId}
          setExpandedNoteId={setExpandedNoteId}
        />
      </section>
    </div>
  );
};

export default Notes;