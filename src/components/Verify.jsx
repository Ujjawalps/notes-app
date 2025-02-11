import { useEffect } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get("userId");
        const secret = urlParams.get("secret");

        if (userId && secret) {
          await account.updateVerification(userId, secret);
          alert("Email verified successfully!");
          navigate("/");
        }
      } catch (error) {
        console.error("Verification Error:", error);
      }
    };

    verifyUser();
  }, [navigate]);

  return <h2>Verifying your email...</h2>;
};

export default Verify;
