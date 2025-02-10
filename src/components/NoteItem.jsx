import "../styles/NoteItem.css";

const NoteItem = ({ note, onEdit, onDelete, expandedNoteId, setExpandedNoteId }) => {
  const isExpanded = expandedNoteId === note.$id;

  const toggleExpand = () => {
    setExpandedNoteId(isExpanded ? null : note.$id);
  };

  return (
    <div 
      className={`note-card ${isExpanded ? "expanded" : ""}`} 
      onClick={toggleExpand}
    >
      <h3>{note.title}</h3>

      <p dangerouslySetInnerHTML={{
        __html: isExpanded ? note.content : note.content.split(" ").slice(0, 15).join(" ") + "..."
      }}></p>

      {isExpanded && (
        <div className="actions">
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              console.log("Editing Note:", note); // ✅ Debugging Log
              onEdit(note); // ✅ Call Edit function properly
            }}>
            Edit
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(note.$id); }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteItem;
