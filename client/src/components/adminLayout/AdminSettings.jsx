import React, { useEffect, useState } from "react";

export default function AdminSettings() {
  const [alerts, setAlerts] = useState([]);
  const [lastLogin, setLastLogin] = useState("");

  useEffect(() => {
    // Dummy alerts (no backend needed)
    const savedAlerts =
      JSON.parse(localStorage.getItem("adminDemoAlerts")) || [
        "🆕 New student registered",
        "⚠️ Unapproved login attempt blocked",
        "✅ System running normally",
      ];

    localStorage.setItem("adminDemoAlerts", JSON.stringify(savedAlerts));
    setAlerts(savedAlerts);

    // last activity
    const now = new Date().toLocaleString();
    setLastLogin(now);
    localStorage.setItem("adminLastLogin", now);
  }, []);

  const clearAlerts = () => {
    localStorage.removeItem("adminDemoAlerts");
    setAlerts([]);
    alert("Alerts cleared");
  };

  return (
    <div style={styles.container}>
      <h2>⚙️ Admin Settings</h2>
      <p style={{ color: "#555" }}>
        Control system behaviour & admin information
      </p>

      {/* SYSTEM STATUS */}
      <div style={styles.card}>
        <h4>🛡 System Status</h4>
        <p>✔ Server: Running</p>
        <p>✔ Security: Active</p>
        <p>✔ Database: Connected</p>
      </div>

      {/* ADMIN ACTIVITY */}
      <div style={styles.card}>
        <h4>👤 Admin Activity</h4>
        <p>Last Admin Login:</p>
        <strong>{lastLogin}</strong>
      </div>

      {/* ALERTS */}
      <div style={styles.card}>
        <h4>🔔 Admin Alerts</h4>

        {alerts.length === 0 ? (
          <p>No alerts available</p>
        ) : (
          alerts.map((a, i) => (
            <div key={i} style={styles.alert}>
              {a}
            </div>
          ))
        )}

        <button style={styles.btn} onClick={clearAlerts}>
          Clear Alerts
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "auto",
    background: "#ffffff",
    padding: "25px",
    borderRadius: "10px",
  },
  card: {
    background: "#f5f7fb",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
  },
  alert: {
    background: "#fff",
    padding: "8px",
    marginBottom: "8px",
    borderLeft: "4px solid #7f5af0",
  },
  btn: {
    marginTop: "10px",
    padding: "8px 14px",
    background: "#7f5af0",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};