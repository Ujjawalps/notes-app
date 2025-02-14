import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databases, databaseID, collectionID } from "../appwriteConfig";
import { ID } from "appwrite";
import { useUserContext } from '../context/UserContext'; // Import UserContext

const NotePage = () => {  // Remove user prop
  const user = useUserContext(); // Get User from context

  if (!user) {
    return <div>Loading user data...</div>;
  }

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
        alert("Error fetching note. Please try again."); // User-friendly message
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
        userId: user.$id, // Use user from context
      });
      alert("Note saved to your notes!");
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note. Please try again."); // User-friendly message
    }
  };

  if (error) return <p>{error}</p>;
  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p dangerouslySetInnerHTML={{ __html: note.content }}></p>

      {user && <button onClick={handleSaveNote}>Save to My Notes</button>}
    </div>
  );
};

export default NotePage;