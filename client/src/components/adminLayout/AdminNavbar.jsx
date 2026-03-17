import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={navbar}>
      {/* LEFT */}
      <div style={left}>
        🎓 <span style={{ marginLeft: "8px" }}>Admin Panel</span>
      </div>

      {/* RIGHT */}
      <div style={right}>
        <NavLink to="/admin/dashboard" style={navStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/notices" style={navStyle}>
          Notices
        </NavLink>

        {/* ✅ NEW LINK */}
        <NavLink to="/admin/student-record" style={navStyle}>
          Student Records
        </NavLink>

        <NavLink to="/admin/settings" style={navStyle}>
          Settings
        </NavLink>

        <NavLink to="/admin/change-password" style={navStyle}>
          Change Password
        </NavLink>

        <button onClick={logout} style={logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const navbar = {
  height: "60px",
  background: "linear-gradient(90deg,#6a3fa0,#4f46e5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  color: "#fff",
  boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
};

const left = {
  fontSize: "20px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
};

const right = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const navStyle = ({ isActive }) => ({
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
  padding: "6px 12px",
  borderRadius: "6px",
  background: isActive ? "rgba(255,255,255,0.2)" : "transparent",
  transition: "0.3s",
});

/* Logout button */
const logoutBtn = {
  background: "#ffffff",
  border: "none",
  padding: "6px 14px",
  color: "#4f46e5",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.3s",
};