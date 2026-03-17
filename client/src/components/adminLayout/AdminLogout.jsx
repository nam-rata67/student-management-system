import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("adminSettings"));
    if (!settings) return;

    document.body.style.zoom = `${settings.zoom || 100}%`;
    document.body.style.background = settings.darkMode ? "#0f172a" : "#f3f4f6";
    document.body.style.color = settings.darkMode ? "#ffffff" : "#000000";

    if (settings.sessionTimeout) {
      let timer;

      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          alert("Session expired");
          localStorage.clear();
          navigate("/login");
        }, 3 * 60 * 1000);
      };

      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
      resetTimer();

      return () => {
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
        clearTimeout(timer);
      };
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* 🔹 NAVBAR */}
      <div style={styles.navbar}>
        <h2 style={styles.title}>🎓 Admin Panel</h2>

        <div style={styles.menu}>
          <NavLink to="/admin/dashboard" style={styles.link}>Dashboard</NavLink>
          <NavLink to="/admin/notices" style={styles.link}>Notices</NavLink>
          <NavLink to="/admin/settings" style={styles.link}>Settings</NavLink>
          <NavLink to="/admin/change-password" style={styles.link}>Change Password</NavLink>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      {/* 🔹 PAGE CONTENT */}
      <div style={styles.content}>
        <Outlet />
      </div>
    </>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",   // ⬅ kam kiya
    background: "#7f5af0",
    color: "white",
  },

  title: {
    fontSize: "18px",      // ⬅ chhota
  },

  menu: {
    display: "flex",
    gap: "10px",           // ⬅ pehle 20px tha
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",      // ⬅ chhota text
    padding: "4px 8px",    // ⬅ kam padding
    borderRadius: "6px",
  },

  logoutBtn: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "4px 10px",   // ⬅ compact
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },

  content: {
    padding: "20px",
  },
};