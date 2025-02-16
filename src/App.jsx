import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // Auth Context
import Notes from "./components/Notes";
import AuthForm from "./components/AuthForm";
import "./App.css"; // Ensure dark theme styles are applied

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/sign-in" />;
  return children;
}


function App() {
  return (
    <div className="app-container"> {/* ✅ Add a wrapper for dark theme */}
      <Router>
        <Routes>
          <Route path="/sign-in" element={<AuthForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
