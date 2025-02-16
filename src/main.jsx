import React from "react";
import { createRoot } from "react-dom/client"; // ✅ Correct import
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
