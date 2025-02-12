import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { account } from "./appwriteConfig";
import AuthForm from "./components/AuthForm";
import Notes from "./components/Notes";
import VerifyEmail from "./components/VerifyEmail";
import Verify from "./components/Verify";  // ✅ Import Verify Page
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

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <div>
        {!user && (
          <div className="welcome-container">
            <h1 className="welcome-text">Welcome to Note-App</h1>
          </div>
        )}

        <Routes>
          <Route path="/" element={
            user ? (
              user.emailVerification ? (
                <Notes user={user} onLogout={handleLogout} />
              ) : (
                <VerifyEmail setUser={setUser} />
              )
            ) : (
              <AuthForm setUser={setUser} />
            )
          } />
          <Route path="/verify" element={<Verify />} /> {/* ✅ Fix: Added Verify Page Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
