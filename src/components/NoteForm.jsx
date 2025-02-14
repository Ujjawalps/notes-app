import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/NoteForm.css";
import { databases, databaseID, collectionID, ID } from "../appwriteConfig";
import { useUserContext } from '../context/UserContext'; // Import UserContext

const NoteForm = ({
  isEditing = false,
  initialTitle = "",
  initialContent = "",
  noteId = null,
  onSave,
  onCancel,
}) => {
  const user = useUserContext(); // Get user from context

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (isEditing) {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [isEditing, initialTitle, initialContent]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      if (isEditing && noteId) {
        await databases.updateDocument(
          databaseID,
          collectionID,
          noteId,
          { title, content }
        );
        console.log("Note Updated!");
        onSave({ $id: noteId, title, content });
      } else {
        const newNote = await databases.createDocument(
          databaseID,
          collectionID,
          ID.unique(),
          { title, content, userId: user.$id } // Use user from context
        );
        console.log("New Note Created:", newNote);
        onSave(newNote);
      }
    } catch (error) {
      console.error("Error saving/updating note:", error);
      alert("Error saving/updating note. Please try again."); // User-friendly message
    }

    setTitle("");
    setContent("");
  };

  return (
    <div className="add-note-form">
      {/* ... (rest of your JSX - title input, TinyMCE editor, buttons) */}
      <Editor
        apiKey="8fzy64bku8uf6h6z8pb7iw5jgv5fv0u5b6sv59fef1q8zrjx"
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 200,
          menubar: false,
          plugins: "lists link image table code help wordcount",
          toolbar: "undo redo | bold italic underline | bullist numlist | link image | forecolor backcolor | code",
          directionality: "ltr",
          content_style: "body { direction: ltr; text-align: left; }",
          readonly: false,
          setup: (editor) => {
            editor.on("init", () => {
              editor.setContent(initialContent);
            });
          },
        }}
      />
      {/* ... */}
    </div>
  );
};

export default NoteForm;