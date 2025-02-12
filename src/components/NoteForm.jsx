import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/NoteForm.css"; // Import styles
import { databases, databaseID, collectionID, ID } from "../appwriteConfig"; // ✅ Import ID

const NoteForm = ({ 
  isEditing = false, 
  initialTitle = "", 
  initialContent = "", 
  noteId = null,  // ✅ Ensure default null for new notes
  onSave, 
  onCancel, 
  user 
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (isEditing) {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [isEditing, initialTitle, initialContent]);  

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;  // ✅ Prevent empty notes
  
    try {
      if (isEditing && noteId) {
        // ✅ Update existing note
        await databases.updateDocument(
          databaseID,
          collectionID,
          noteId,
          { title, content }
        );
        console.log("Note Updated!");
        onSave({ $id: noteId, title, content }); // ✅ Ensure update is reflected
      } else {
        // ✅ Create new note
        const newNote = await databases.createDocument(
          databaseID,
          collectionID,
          ID.unique(),
          { title, content, userId: user.$id }
        );
        console.log("New Note Created:", newNote);
        onSave(newNote); // ✅ Ensure new note is added to state
      }
    } catch (error) {
      console.error("Error saving/updating note:", error);
    }
  
    setTitle(""); // ✅ Reset form fields
    setContent("");
  };

  
  return (
    <div className="add-note-form">
      <h3>{isEditing ? "Edit Note" : "Add Note"}</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Editor
        apiKey="8fzy64bku8uf6h6z8pb7iw5jgv5fv0u5b6sv59fef1q8zrjx"
        value={content}  // ✅ Controlled value
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 200,
          menubar: false,
          plugins: "lists link image table code help wordcount",
          toolbar: "undo redo | bold italic underline | bullist numlist | link image | forecolor backcolor | code",
          directionality: "ltr",
          content_style: "body { direction: ltr; text-align: left; }",
          readonly: false,  // ✅ Ensure editable mode
          setup: (editor) => {
            editor.on("init", () => {
              editor.setContent(initialContent);  // ✅ Properly set initial content
            });
          },
        }}
      />

      <div className="button-container">
        <button onClick={handleSubmit}>
          {isEditing ? "Update" : "Add Note"}
        </button>
        {isEditing && <button className="cancel-btn" onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
};

export default NoteForm;
