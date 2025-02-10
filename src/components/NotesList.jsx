import NoteItem from "./NoteItem";
import "../styles/NotesList.css"; 
import { useState } from "react";

const NotesList = ({ notes, onEdit, onDelete, expandedNoteId, setExpandedNoteId }) => {
  return (
    <div className="notes-container">
      {notes.map((note) => (
        <NoteItem
          key={note.$id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          expandedNoteId={expandedNoteId}
          setExpandedNoteId={setExpandedNoteId} // ✅ Pass down
        />
      ))}
    </div>
  );
};

export default NotesList;
