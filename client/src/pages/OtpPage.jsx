import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ otp }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Email verified successfully ✅");
        navigate("/"); // Home page par bhej dega
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Enter Your OTP</h2>

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginTop: "20px",
        }}
      />

      <br />

      <button
        onClick={handleVerify}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpPage;