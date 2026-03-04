import { useParams, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/auth/verify/${token}`,
          {
            method: "GET",
            credentials: "include", // ⚠ IMPORTANT
          }
        );

        if (res.ok) {
          navigate("/otp");
        } else {
          alert("Verification failed");
        }
      } catch (error) {
        console.log(error);
        alert("Server error");
      }
    };

    verifyUser();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Verifying your email...</h2>
    </div>
  );
};

export default VerifyPage;