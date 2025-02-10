import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databases, databaseID, collectionID } from "../appwriteConfig";
import { ID } from "appwrite";

const NotePage = ({ user }) => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await databases.getDocument(databaseID, collectionID, noteId);
        setNote(response);
      } catch (error) {
        setError("Note not found or access denied.");
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const handleSaveNote = async () => {
    if (!user) return alert("You must be logged in to save notes.");

    try {
      await databases.createDocument(databaseID, collectionID, ID.unique(), {
        title: note.title,
        content: note.content,
        userId: user.$id, // ✅ Save under current user's account
      });
      alert("Note saved to your notes!");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  if (error) return <p>{error}</p>;
  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
      
      {/* ✅ Show Save Button */}
      {user && <button onClick={handleSaveNote}>Save to My Notes</button>}
    </div>
  );
};

export default NotePage;
