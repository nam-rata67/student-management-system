import React from "react";
import axios from "axios";

const API_BASE = "https://student-management-system-using-mern-in35.onrender.com/api/users";

export default class AdminChangePassword extends React.Component {
  state = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    loading: false,
    error: "",
    success: "",
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "", success: "" });

    const { currentPassword, newPassword, confirmPassword } = this.state;
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    if (!email) return this.setState({ error: "Please login again ❌" });
    if (!currentPassword || !newPassword || !confirmPassword)
      return this.setState({ error: "All fields are required" });

    if (newPassword.length < 6)
      return this.setState({ error: "Password must be at least 6 characters" });

    if (newPassword !== confirmPassword)
      return this.setState({ error: "Passwords do not match" });

    this.setState({ loading: true });

    try {
      const res = await axios.post(`${API_BASE}/change-password`, {
        email,
        currentPassword,
        newPassword,
      });

      this.setState({
        success: "Password updated successfully 🎉",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      this.setState({
        error: err?.response?.data?.message || "Server error ❌",
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { currentPassword, newPassword, confirmPassword, loading, error, success } =
      this.state;

    return (
      <div style={container}>
        <div style={card}>
          <h2 style={title}>Change Password</h2>
          <p style={subtitle}>Keep your account secure 🔐</p>

          {error && <div style={errorBox}>{error}</div>}
          {success && <div style={successBox}>{success}</div>}

          <form onSubmit={this.handleSubmit}>
            <div style={field}>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={this.handleChange}
                required
                style={input}
              />
              <label style={label}>Current Password</label>
            </div>

            <div style={field}>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={this.handleChange}
                required
                style={input}
              />
              <label style={label}>New Password</label>
            </div>

            <div style={field}>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
                required
                style={input}
              />
              <label style={label}>Confirm Password</label>
            </div>

            <button style={button} disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

/* ================= STYLES ================= */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "420px",
  padding: "40px",
  borderRadius: "25px",
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
  color: "#fff",
};

const title = {
  textAlign: "center",
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "8px",
};

const subtitle = {
  textAlign: "center",
  fontSize: "14px",
  marginBottom: "30px",
  opacity: 0.8,
};

const field = {
  position: "relative",
  marginBottom: "25px",
};

const input = {
  width: "100%",
  padding: "14px 12px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.3)",
  background: "transparent",
  color: "#fff",
  fontSize: "15px",
  outline: "none",
};

const label = {
  position: "absolute",
  top: "-10px",
  left: "12px",
  background: "#203a43",
  padding: "0 6px",
  fontSize: "12px",
  color: "#00f2fe",
};

const button = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  background: "linear-gradient(135deg,#00f2fe,#4facfe)",
  color: "#000",
  cursor: "pointer",
  marginTop: "10px",
  transition: "0.3s",
};

const errorBox = {
  background: "rgba(255,0,0,0.8)",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
  marginBottom: "15px",
};

const successBox = {
  background: "rgba(0,255,0,0.8)",
  padding: "10px",
  borderRadius: "10px",
  textAlign: "center",
  marginBottom: "15px",
};
