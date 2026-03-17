import { Link } from "react-router-dom";

export default function GuestNavbar() {
  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>🎓 SMS</h2>

      <div>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.registerBtn} to="/register">Register</Link>
        <Link style={styles.link} to="/login">Login</Link>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "linear-gradient(90deg,#4f46e5,#6366f1)",
    color: "white",
    alignItems: "center"
  },
  logo: {
    margin: 0
  },
  link: {
    color: "white",
    marginRight: "20px",
    textDecoration: "none",
    fontSize: "16px"
  },
  registerBtn: {
    background: "white",
    color: "#4f46e5",
    padding: "6px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "bold"
  }
};