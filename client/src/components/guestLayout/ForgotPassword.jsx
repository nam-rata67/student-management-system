import React, { useState } from "react";
import axios from "axios";

const bgStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#1d2671,#c33764)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const glassCard = {
  width: "520px",
  padding: "45px",
  borderRadius: "25px",
  background: "rgba(255,255,255,0.18)",
  backdropFilter: "blur(15px)",
  boxShadow: "0 12px 45px rgba(0,0,0,0.4)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.3)",
};

const avatarCircle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "38px",
  fontWeight: "bold",
  margin: "0 auto 15px auto",
  color: "#333",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "5px",
  fontSize: "26px",
};

const subTitle = {
  textAlign: "center",
  opacity: 0.85,
  marginBottom: "30px",
  fontSize: "16px",
};

const inputRow = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.25)",
  borderRadius: "12px",
  padding: "12px 15px",
  marginBottom: "16px",
};

const inputStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "16px",
  padding: "8px",
  outline: "none",
  width: "100%",
};

const iconStyle = {
  fontSize: "20px",
  marginRight: "14px",
};

const saveBtn = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(135deg,#00b09b,#96c93d)",
  border: "none",
  borderRadius: "14px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("https://student-management-system-using-mern-in35.onrender.com/api/users/forgot-password", {
        email,
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Mail not sent ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={bgStyle}>
      <div style={glassCard}>
        <div style={avatarCircle}>📧</div>

        <h2 style={titleStyle}>Forgot Password</h2>
        <p style={subTitle}>Enter your email to receive a temporary password</p>

        <form onSubmit={handleSubmit}>
          <div style={inputRow}>
            <span style={iconStyle}>📧</span>
            <input
              type="email"
              placeholder="Enter your email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" style={saveBtn} disabled={loading}>
            {loading ? "Sending..." : "Send Temporary Password"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px", textAlign: "center" }}>{message}</p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
