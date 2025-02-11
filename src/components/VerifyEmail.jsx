import { useEffect, useState } from "react";
import { account } from "../appwriteConfig";

const VerifyEmail = ({ setUser }) => {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const checkVerification = async () => {
    setChecking(true);
    setError("");

    try {
      const updatedUser = await account.get();
      if (updatedUser.emailVerification) {
        setUser(updatedUser);  // ✅ User is verified, proceed to Notes page
      } else {
        setError("Your email is not verified yet. Please check your inbox.");
      }
    } catch (err) {
      setError("Error checking verification status. Please try again.");
    }

    setChecking(false);
  };

  return (
    <div className="verify-container">
      <h2>Please Verify Your Email</h2>
      <p>Check your inbox for a verification email. Once verified, click the button below.</p>
      
      {error && <p className="error">{error}</p>}
      
      <button onClick={checkVerification} disabled={checking}>
        {checking ? "Checking..." : "I have verified my email"}
      </button>
    </div>
  );
};

export default VerifyEmail;
