import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://student-management-system-using-mern-in35.onrender.com/api/users/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }

    setIsLoading(false);
  };

  /* ===== LOADER ===== */
  if (isLoading) {
    return (
      <div style={loader.page}>
        <div style={loader.spinner}></div>
        <p style={{ marginTop: 20 }}>Signing you in...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <motion.div
        style={styles.glassCard}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.title}>Student Management Portal</h2>
        <p style={styles.subtitle}>
          Secure login for students & administrators
        </p>

        {message && <div style={styles.error}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            style={styles.input}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              style={styles.input}
            />

            <span
              style={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <div
            style={styles.forgot}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            style={styles.loginBtn}
            type="submit"
          >
            Sign In
          </motion.button>
        </form>

        <div style={styles.divider}>OR</div>

        {/* ✅ GOOGLE LOGIN WORKING */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          style={styles.googleBtn}
          onClick={() => {
            window.open(
              "https://student-management-system-sslt.onrender.com/api/auth/google",
              "_self"
            );
          }}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
            style={{ width: 20 }}
          />
          Continue with Google
        </motion.button>

        <p style={styles.signupText}>
          Don't have an account?
          <span
            style={styles.signupLink}
            onClick={() => navigate("/register")}
          >
            {" "}
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top,#020617,#000)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Poppins",
  },

  blob1: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "linear-gradient(135deg,#22c55e,#38bdf8)",
    filter: "blur(120px)",
    top: -60,
    left: -60,
  },

  blob2: {
    position: "absolute",
    width: 300,
    height: 300,
    background: "linear-gradient(135deg,#a855f7,#ec4899)",
    filter: "blur(120px)",
    bottom: -60,
    right: -60,
  },

  glassCard: {
    width: 380,
    padding: 35,
    borderRadius: 20,
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
    color: "#fff",
    zIndex: 1,
  },

  title: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: 700,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 25,
    color: "#cbd5f5",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#020617",
    outline: "none",
    fontSize: 14,
    boxSizing: "border-box",
  },

  eye: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },

  forgot: {
    textAlign: "right",
    fontSize: 13,
    marginBottom: 20,
    color: "#38bdf8",
    cursor: "pointer",
  },

  loginBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg,#22c55e,#38bdf8)",
    color: "#020617",
    fontWeight: 700,
    cursor: "pointer",
  },

  divider: {
    textAlign: "center",
    margin: "18px 0",
    fontSize: 12,
    color: "#94a3b8",
  },

  googleBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.3)",
    background: "transparent",
    color: "#fff",
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  signupText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#cbd5f5",
  },

  signupLink: {
    color: "#38bdf8",
    marginLeft: 6,
    cursor: "pointer",
    fontWeight: "600",
  },

  error: {
    background: "rgba(239,68,68,0.15)",
    padding: 10,
    borderRadius: 8,
    fontSize: 13,
    marginBottom: 14,
    textAlign: "center",
    color: "#fecaca",
  },
};

/* ================= LOADER ================= */

const loader = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#020617",
    color: "#fff",
  },

  spinner: {
    width: 60,
    height: 60,
    border: "6px solid rgba(255,255,255,0.2)",
    borderTop: "6px solid #38bdf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

/* spinner animation */
const style = document.createElement("style");
style.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(style);
