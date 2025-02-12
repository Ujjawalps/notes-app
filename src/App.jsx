import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { account } from "./appwriteConfig";
import AuthForm from "./components/AuthForm";
import Notes from "./components/Notes";
import VerifyEmail from "./components/VerifyEmail";
import Verify from "./components/Verify";  // ✅ Ensure Verify component is imported
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  if (loading) return <p>Loading...</p>;  // ✅ Show loading text

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            {!user && (
              <div className="welcome-container">
                <h1 className="welcome-text">Welcome to Note-App</h1>
              </div>
            )}
            {user ? (
              user.emailVerification ? (
                <Notes user={user} onLogout={handleLogout} />
              ) : (
                <VerifyEmail setUser={setUser} />
              )
            ) : (
              <AuthForm setUser={setUser} />
            )}
          </div>
        } />

        {/* ✅ Handle Email Verification */}
        <Route path="/verify" element={<Verify setUser={setUser} />} />

        {/* ✅ Optional: Catch all unknown routes */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
