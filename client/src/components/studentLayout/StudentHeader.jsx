import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const StudentHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "static",
        height: "70px",
        background: "linear-gradient(90deg,#7c3aed,#8b5cf6,#6366f1)",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
      }}
    >
      {/* LEFT */}
      <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>
        🎓 StudentPanel
      </div>

      {/* LINKS */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginLeft: "auto",
          marginRight: "20px",
        }}
      >
        <Link to="/user/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/user/notices" style={linkStyle}>Notices</Link>
        <Link to="/user/profile" style={linkStyle}>Profile</Link>
        <Link to="/user/notes" style={linkStyle}>Notes</Link>

        {/* ✅ NEW DOUBTS LINK */}
        <Link to="/user/doubts" style={linkStyle}>Doubts</Link>

        <Link to="/user/change-password" style={linkStyle}>Password</Link>
      </div>

      {/* LOGOUT */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={logoutStyle}
      >
        Logout
      </motion.button>
    </motion.div>
  );
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "14px",
};

const logoutStyle = {
  background: "rgba(255,255,255,0.15)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.4)",
  padding: "8px 18px",
  borderRadius: "999px",
  fontWeight: "600",
  cursor: "pointer",
};

export default StudentHeader;