import { useEffect, useState } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("userId");
        const secret = urlParams.get("secret");

        if (userId && secret) {
          await account.updateVerification(userId, secret);
          setMessage("✅ Email verified successfully! Redirecting...");
          setTimeout(() => navigate("/"), 3000); // Redirect after 3 sec
        } else {
          setMessage("⚠️ Invalid verification link!");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        setMessage("❌ Verification failed. Please try again.");
      }
    };

    verifyUser();
  }, [navigate]);

  return (
    <div className="verify-container">
      <h2>{message}</h2>
    </div>
  );
};

export default Verify;
