import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ✅ Default Quill styles
import ImageResize from "quill-image-resize-module-react"; // ✅ Correct Image Resize Module
import { useAuth } from "../context/AuthContext";
import { addNote, updateNote } from "../firebase/firestore";
import "../styles/NoteForm.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// ✅ Register Image Resize module
ReactQuill.Quill.register("modules/imageResize", ImageResize);

const NoteForm = ({ isEditing, note, onSave }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const storage = getStorage(); // Initialize Firebase storage

  useEffect(() => {
    if (isEditing) {
      setTitle(note?.title || "");
      setContent(note?.content || "");
    }
  }, [isEditing, note]);

  // ✅ Handle Saving Notes (New or Edit)
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    if (isEditing) {
      await updateNote(note.id, title, content);
    } else {
      await addNote(title, content, user.uid);
    }

    setTitle("");
    setContent("");
    onSave();
  };

  // ✅ Handle Image Upload to Firebase
  const handleImageUpload = async (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(`Upload Progress: ${(snapshot.bytesTransferred / snapshot.totalBytes) * 100}%`);
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // ✅ Handle Image Paste or Upload via Quill
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const imageUrl = await handleImageUpload(file);
      const editor = document.querySelector(".ql-editor");

      // ✅ Ensure images have a default size and new lines before & after
      const imgTag = `<br><img src="${imageUrl}" alt="Uploaded Image" style="max-width: 250px; height: auto; display: block; margin: 10px auto;"/><br>`;

      editor.innerHTML += imgTag;
    };
  };

  return (
    <div className="note-form">
      <h3>{isEditing ? "Edit Note" : "Add Note"}</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* ✅ Quill.js Editor with Image Resize */}
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            [{ color: [] }, { background: [] }],
            ["link", "image"], // Image Upload Button
            ["clean"],
          ],
          handlers: {
            image: imageHandler, // Custom Image Upload
          },
          imageResize: {
            parchment: ReactQuill.Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        }}
      />

      <button onClick={handleSubmit}>{isEditing ? "Update" : "Add Note"}</button>
    </div>
  );
};

export default NoteForm;
