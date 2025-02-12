import { useEffect, useState } from "react";
import { account } from "../appwriteConfig";
import { useSearchParams, useNavigate } from "react-router-dom";

const Verify = ({ setUser }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("🔄 Verifying your email...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const secret = searchParams.get("secret"); // ✅ Only use 'secret'

        if (!secret) {
          setMessage("⚠️ Invalid verification link.");
          return;
        }

        console.log("🔍 Received Secret:", secret); // ✅ Debugging log

        // ✅ Call Appwrite to verify the email
        await account.updateVerification(secret);
        console.log("✅ Email Verified Successfully!");

        setMessage("✅ Email verified successfully! Redirecting...");

        // ✅ Fetch updated user data
        const updatedUser = await account.get();
        console.log("🆕 Updated User Data:", updatedUser);

        setUser(updatedUser);

        // ✅ Redirect to home page after 3 seconds
        setTimeout(() => navigate("/"), 3000);
      } catch (err) {
        console.error("❌ Verification Error:", err);
        setError(err.message);
        setMessage("❌ Verification failed. Try again.");
      }
    };

    verifyUser();
  }, [searchParams, navigate, setUser]);

  return (
    <div className="verify-container">
      <h2>Email Verification</h2>
      <p>{message}</p>
      {error && <p className="error">❌ {error}</p>}
    </div>
  );
};

export default Verify;
