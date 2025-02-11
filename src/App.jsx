import { useEffect, useState } from "react";
import { account } from "./appwriteConfig";
import AuthForm from "./components/AuthForm";
import Notes from "./components/Notes";
import "./App.css";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    account.get()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  return (
    <div>
      {!user && (
        <div className="welcome-container">
          <h1 className="welcome-text">Welcome to Note-App</h1>
        </div>
      )}
      {user ? (
        <Notes user={user} onLogout={handleLogout} />
      ) : (
        <AuthForm setUser={setUser} />
      )}
    </div>
  );
}

export default App;
