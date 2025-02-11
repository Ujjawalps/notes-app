import { useEffect, useState } from "react";
import { account } from "./appwriteConfig";
import AuthForm from "./components/AuthForm";
import Notes from "./components/Notes";
import VerifyEmail from "./components/VerifyEmail";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    account.get()
      .then((user) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;  // ✅ Show loading text

  return (
    <div>
      {!user && (
        <div className="welcome-container">
          <h1 className="welcome-text">Welcome to Note-App</h1>
        </div>
      )}

      {user ? (
        user.emailVerification ? (
          <Notes user={user} onLogout={handleLogout} />  // ✅ Verified users see Notes
        ) : (
          <VerifyEmail setUser={setUser} />  // 🚨 Unverified users see verification page
        )
      ) : (
        <AuthForm setUser={setUser} />
      )}
    </div>
  );
}

export default App;
