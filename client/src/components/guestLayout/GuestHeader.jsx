import { Link } from "react-router-dom";

export default function GuestHeader() {
  return (
    <div
      style={{
        padding: "18px 40px",
        background: "linear-gradient(90deg,#4f46e5,#6366f1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 600 }}>
        🎓 Student Management System
      </div>

      <div style={{ display: "flex", gap: 22 }}>
        <Link to="/" style={linkStyle}>Home</Link>
         <Link to="/register" style={linkStyle}>Register</Link>
        <Link to="/login" style={linkStyle}>Login</Link>
       
      </div>
    </div>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: 16,
  fontWeight: 500,
};