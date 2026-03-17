import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";


export default function AdminLayout() {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const adminProfile = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {

    if (!token || role !== "admin" || !adminProfile) {
      navigate("/login");
      return;
    }

    const settings = JSON.parse(localStorage.getItem("adminSettings"));
    if (!settings) return;

    setIsDark(settings.darkMode);

    document.body.style.backgroundColor = settings.darkMode
      ? "#020617"
      : "#f3f4f6";

    document.body.style.color = settings.darkMode
      ? "#f8fafc"
      : "#020617";

    document.body.style.zoom = `${settings.zoom || 100}%`;

    if (settings.notifications) {
      setShowNotify(true);
      setTimeout(() => setShowNotify(false), 3000);
    }

    if (settings.sessionTimeout) {

      let timer;

      const resetTimer = () => {

        clearTimeout(timer);

        timer = setTimeout(() => {

          alert("Session expired due to inactivity");

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

  }, [navigate, token, role, adminProfile]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!adminProfile) return null;

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <div style={styles.navbar(isDark)}>

        <h2>🎓 Admin Panel</h2>

        <div style={styles.menu}>

          <NavLink to="/admin/dashboard" style={styles.link}>
            Dashboard
          </NavLink>

          <NavLink to="/admin/notices" style={styles.link}>
            Notices
          </NavLink>

          <NavLink to="/admin/student-record" style={styles.link}>
            Student Records
          </NavLink>

          <NavLink to="/admin/notes" style={styles.link}>
            Notes
          </NavLink>

          <NavLink to="/admin/doubts" style={styles.link}>
            Doubts
          </NavLink>

          <NavLink to="/admin/settings" style={styles.link}>
            Settings
          </NavLink>

          <NavLink to="/admin/change-password" style={styles.link}>
            Change Password
          </NavLink>


          {/* ===== ADMIN PROFILE ===== */}

          <div style={styles.avatarWrapper}>

            <div
              style={styles.avatar}
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {adminProfile.name?.charAt(0)?.toUpperCase()}
            </div>

            {showProfileMenu && (

              <div style={styles.profileMenu}>

                <p><b>{adminProfile.name}</b></p>

                <p style={{ fontSize: 12, color: "#555" }}>
                  {adminProfile.email}
                </p>

                <hr />

                <button
                  style={styles.menuBtn}
                  onClick={() => navigate("/admin/profile")}
                >
                  Manage Profile
                </button>

                <button
                  style={styles.menuBtn}
                  onClick={logout}
                >
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* ===== Notification ===== */}

      {showNotify && (
        <div style={styles.notification}>
          🔔 You have new system notifications
        </div>
      )}


      {/* ===== CONTENT ===== */}

      <div style={styles.content(isDark)}>
        <Outlet />
      </div>


     

    </>
  );
}



const styles = {

  navbar: (dark) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: dark ? "#020617" : "#4f46e5",
    color: "white",
  }),

  menu: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    position: "relative",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    padding: "6px 12px",
    borderRadius: "6px",
  },

  content: (dark) => ({
    padding: "25px",
    minHeight: "90vh",
    background: dark ? "#020617" : "#f3f4f6",
  }),

  notification: {
    position: "fixed",
    top: "70px",
    right: "20px",
    background: "#22c55e",
    color: "white",
    padding: "10px 15px",
    borderRadius: "6px",
    zIndex: 9999,
    fontWeight: "bold",
  },

  avatarWrapper: {
    position: "relative",
    cursor: "pointer",
    marginLeft: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    background: "#4f46e5",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 22,
    border: "2px solid white",
  },

  profileMenu: {
    position: "absolute",
    top: 60,
    right: 0,
    background: "white",
    color: "#333",
    padding: 10,
    borderRadius: 10,
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    width: 180,
    zIndex: 10,
  },

  menuBtn: {
    width: "100%",
    padding: 6,
    margin: "4px 0",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    background: "#4f46e5",
    color: "white",
    fontWeight: 500,
  },

};