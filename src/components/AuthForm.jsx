import { useState } from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import "../styles/AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>

      <div className="auth-form"> {/* Container for Clerk components */}
        {isLogin ? <SignIn /> : <SignUp />}
      </div>

      <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthForm;