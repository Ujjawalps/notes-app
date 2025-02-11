import { useState } from "react";
import { account, ID } from "../appwriteConfig";
import "../styles/AuthForm.css";

const AuthForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); 
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // ✅ Login User
        await account.createEmailPasswordSession(email, password);
      } else {
        // ✅ Sign Up User
        const newUser = await account.create(ID.unique(), email, password, name);
        await account.createEmailPasswordSession(email, password);

        // ✅ Send Email Verification
        await account.createVerification(`${window.location.origin}/verify`);
        setVerificationSent(true);
      }

      // ✅ Get User Data
      const userData = await account.get();
      setUser(userData);
    } catch (error) {
      if (error.code === 409) {
        setError("This email is already registered. Try logging in.");
      } else {
        setError(error.message || "Authentication failed. Please try again.");
      }
      console.error("Auth Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      
      {verificationSent && (
        <p className="success">
          ✅ Verification email sent! Please check your inbox.
        </p>
      )}

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
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthForm;
