import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp, UserButton, useUser } from "@clerk/clerk-react";
import Notes from "./components/Notes";
import "./App.css";
import { UserProvider } from './context/UserContext'; // Import UserProvider

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return <div>Loading authentication...</div>; // Improved loading message
  if (!isSignedIn) return <SignIn />;

  return children;
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkKey}>
      <UserProvider> {/* Wrap with UserProvider */}
        <Router>
          <div className="header">
            <h1>Welcome to Note-App</h1>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              }
            />

            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </Router>
      </UserProvider>
    </ClerkProvider>
  );
}

export default App;