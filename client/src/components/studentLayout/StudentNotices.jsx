import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function StudentNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get("https://student-management-system-uidc.onrender.com/api/notices")
      .then(res => setNotices(res.data));
  }, []);

  return (
    <div style={{ padding: 30, background: "#f9fafb", minHeight: "100vh" }}>
      <h2 style={{ color: "#1f2933", marginBottom: 15 }}>📢 Notices</h2>

      {notices.map((n, i) => (
        <motion.div
          key={n._id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.02 }}
          style={card}
        >
          {n.text}
        </motion.div>
      ))}
    </div>
  );
}

const card = {
  background: "linear-gradient(135deg,#e0e7ff,#f0f9ff)", // soft color
  padding: 14,
  borderRadius: 12,
  marginBottom: 12,
  color: "#1e3a8a",
  fontWeight: "500",
  boxShadow: "0 4px 12px rgba(0,0,0,.08)",
  cursor: "default",
};
