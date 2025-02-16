import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addNote, getNotes, updateNote, deleteNote } from "../firebase/firestore";
import ReactQuill from "react-quill";
import "../styles/Notes.css";
import { quillModules } from "../utils/quillConfig";
import "react-quill/dist/quill.snow.css"; // ✅ Import Quill Styles

const Notes = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, [user]);

  const fetchNotes = async () => {
    const fetchedNotes = await getNotes(user.uid);
    setNotes(fetchedNotes);
  };

  const handleSaveNote = async () => {
    if (!title.trim() || !content.trim()) return;
    if (editingNoteId) {
      await updateNote(editingNoteId, title, content);
    } else {
      await addNote(title, content, user.uid);
    }

    setTitle("");
    setContent("");
    setEditingNoteId(null);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNoteId(note.id);
  };

  const handleDeleteNote = async (noteId) => {
    await deleteNote(noteId);
    fetchNotes();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/sign-in");
  };

  return (
    <div className="notes-container">
      <h2>Welcome, {user.email}</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <br />
      <div className="note-input">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* ✅ Quill.js Editor */}
        <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} />

        <button onClick={handleSaveNote} className="add-note-btn">
          {editingNoteId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note">
              <h3>{note.title}</h3>
              <p
                className="note-content"
                dangerouslySetInnerHTML={{
                  __html: note.content.replace(
                    /<img /g,
                    '<img style="max-width: 250px; height: auto; display: block; margin: 10px auto;" '
                  ),
                }}
              ></p>
              <div className="button-group">
                <button onClick={() => handleEdit(note)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDeleteNote(note.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;
