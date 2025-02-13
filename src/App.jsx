import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp, UserButton, useUser } from "@clerk/clerk-react";
import Notes from "./components/Notes";
import "./App.css";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <p>Loading...</p>;
  if (!isSignedIn) return <SignIn />; // Redirects to login if not signed in

  return children;
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <Router>
        <div className="header">
          <h1>Welcome to Note-App</h1>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        <Routes>
          {/* ✅ Protected Route - Only Signed In Users Can Access */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />

          {/* ✅ Authentication Routes */}
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          {/* ✅ Catch-all route */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}

export default App;
