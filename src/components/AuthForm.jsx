import { useState } from "react";
import { account, ID } from "../appwriteConfig";
import "../styles/AuthForm.css";

const AuthForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // ✅ Store user's name
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // ✅ Fix function name (was `createEmailSession`)
        await account.createEmailPasswordSession(email, password);
      } else {
        // ✅ Fix: Prevent duplicate user errors by using unique ID
        const user = await account.create(ID.unique(), email, password, name); 
        
        // ✅ Fix: Auto-login after signup
        await account.createEmailPasswordSession(email, password);
      }

      // ✅ Fetch user immediately after login/signup
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      if (error.message.includes("already exists")) {
        setError("This email is already registered. Try logging in.");
      } else {
        setError("Authentication failed. Please try again.");
      }
      console.error("Auth Error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleAuth} className="auth-form">
        {!isLogin && (
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>

      <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthForm;
