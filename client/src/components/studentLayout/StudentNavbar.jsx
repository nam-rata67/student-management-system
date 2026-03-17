import { NavLink, useNavigate } from "react-router-dom";

const StudentNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");   // ✅ TOKEN CLEAR
    navigate("/login");                 // ✅ LOGIN REDIRECT
  };

  return (
    <nav style={styles.nav}>
      <NavLink to="/user/dashboard" style={styles.link}>Dashboard</NavLink>
      <NavLink to="/user/profile" style={styles.link}>Profile</NavLink>
      <NavLink to="/user/notices" style={styles.link}>Notices</NavLink>
      <NavLink to="/user/notes" style={styles.link}>Notes</NavLink>
     <NavLink to="/user/doubts" style={styles.link}>Doubts</NavLink>
      <NavLink to="/user/change-password" style={styles.link}>
        Change Password
      </NavLink>

      {/* ✅ REAL LOGOUT */}
      <span onClick={handleLogout} style={styles.logout}>
        Logout
      </span>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    gap: "15px",
    padding: "12px",
    background: "#eef2ff",
    justifyContent: "center",
  },
  link: {
    textDecoration: "none",
    color: "#1e3a8a",
    fontWeight: "600",
  },
  logout: {
    cursor: "pointer",
    color: "red",
    fontWeight: "600",
  },
};

export default StudentNavbar;