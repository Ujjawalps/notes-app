import { useEffect, useState } from "react";
import { account } from "../appwriteConfig";
import { useSearchParams, useNavigate } from "react-router-dom";

const Verify = ({ setUser }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userId = searchParams.get("userId");
        const secret = searchParams.get("secret");

        if (userId && secret) {
          await account.updateVerification(userId, secret);
          setMessage("✅ Email verified successfully! Redirecting...");
          
          // ✅ Fetch updated user data
          const updatedUser = await account.get();
          setUser(updatedUser);

          // ✅ Redirect after 3 seconds
          setTimeout(() => navigate("/"), 3000);
        } else {
          setMessage("⚠️ Invalid verification link!");
        }
      } catch (error) {
        console.error("Verification Error:", error);
        setMessage("❌ Verification failed. Try again.");
      }
    };

    verifyUser();
  }, [searchParams, navigate, setUser]);

  return (
    <div className="verify-container">
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default Verify;
