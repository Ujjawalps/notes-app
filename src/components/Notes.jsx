import { useState, useEffect } from "react";
import { databases, databaseID, collectionID } from "../appwriteConfig";
import NoteForm from "./NoteForm";
import NotesList from "./NotesList";
import { ID, Query } from "appwrite";  // ✅ Import Query for filtering
import "../styles/Notes.css";

const Notes = ({ user, onLogout }) => { 
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedNoteId, setExpandedNoteId] = useState(null); // ✅ Add this line



  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await databases.listDocuments(
          databaseID,
          collectionID,
          [Query.equal("userId", user.$id)] // ✅ Fetch only notes of logged-in user
        );
        setNotes(response.documents);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [user]); // ✅ Re-fetch notes when user changes (logout/login)

  // ✅ Reset Notes on Logout
  useEffect(() => {
    return () => setNotes([]); // Clear notes when component unmounts (logout)
  }, [onLogout]);

  const handleSearch = () => {
    if (searchTerm.length < 3) return; // ✅ Ignore short searches
  
    const filteredNotes = notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    setNotes(filteredNotes); // ✅ Update displayed notes
  };
  

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
  
        {/* ✅ Fix: Edit Mode should correctly load the NoteForm */}
        {editMode && editNote ? (
          <NoteForm 
            user={user}  
            isEditing={true} 
            noteId={editNote.$id}  
            initialTitle={editNote.title}  
            initialContent={editNote.content}  
            onSave={(title, content, noteId) => { 
              setNotes(notes.map(note => 
                note.$id === noteId ? { ...note, title, content } : note
              ));
              setEditMode(false);
              setEditNote(null);
            }}
            onCancel={() => setEditMode(false)}
          />
        ) : (
          <NoteForm 
            user={user}  
            isEditing={false} 
            onSave={(title, content, userId) => {
              setNotes([...notes, { $id: ID.unique(), title, content, userId }]);
            }} 
          />
        )}
  
        {/* 🔹 Search Feature */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          {/* 🔹 Desktop Search Button */}
          <button className="search-btn" onClick={() => handleSearch()}>
            Search
          </button>
  
          {/* 🔹 Mobile Search Button (Icon Only) */}
          <button className="search-btn mobile" onClick={() => handleSearch()}>
            🔍
          </button>
        </div>
  
        {/* 🔹 Notes List */}
        <NotesList 
          notes={notes} 
          onEdit={(note) => {
            console.log("Editing Note:", note); // ✅ Debugging Log
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
