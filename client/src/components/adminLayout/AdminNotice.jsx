import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminNotices() {
  const [text, setText] = useState("");
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    const res = await axios.get("https://student-management-system-uidc.onrender.com/api/notices");
    setNotices(res.data.reverse());
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const addNotice = async () => {
    if (!text.trim()) return;
    await axios.post("https://student-management-system-uidc.onrender.com/api/notices", { text });
    setText("");
    fetchNotices();
  };

  const deleteNotice = async (id) => {
    await axios.delete(`https://student-management-system-uidc.onrender.com/api/notices/${id}`);
    fetchNotices();
  };

  return (
    <div style={styles.page}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={styles.card}
      >
        <motion.h2
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={styles.title}
        >
          📢 Admin Notice Board
        </motion.h2>

        <p style={styles.subtitle}>Create and broadcast announcements</p>

        <motion.textarea
          whileFocus={{ scale: 1.03 }}
          placeholder="✍️ Write something important..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
        />

        <motion.button
          animate={{ boxShadow: ["0 0 0px #6366f1", "0 0 20px #8b5cf6", "0 0 0px #6366f1"] }}
          transition={{ repeat: Infinity, duration: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addNotice}
          style={styles.addBtn}
        >
          🚀 Publish Notice
        </motion.button>

        <div style={styles.noticeList}>
          {notices.map((n) => (
            <motion.div
              key={n._id}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              style={styles.notice}
            >
              <div>
                <p style={styles.noticeText}>{n.text}</p>
                <span style={styles.time}>
                  🕒 {new Date(n.createdAt || Date.now()).toLocaleString()}
                </span>
              </div>

              <motion.button
                whileHover={{ rotate: 90, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteNotice(n._id)}
                style={styles.deleteBtn}
              >
                ❌
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f172a,#1e1b4b,#312e81)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 60,
    fontFamily: "'Poppins','Inter','Segoe UI',sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: 800,
    background: "rgba(255,255,255,0.12)",
    borderRadius: 26,
    padding: 30,
    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
    backdropFilter: "blur(15px)",
    color: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    letterSpacing: "0.5px",
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#c7d2fe",
    marginBottom: 20,
  },

  textarea: {
    width: "100%",
    height: 100,
    borderRadius: 16,
    border: "none",
    padding: 16,
    fontSize: 15,
    outline: "none",
    background: "rgba(255,255,255,0.85)",
    boxShadow: "inset 0 3px 8px rgba(0,0,0,0.15)",
  },

  addBtn: {
    marginTop: 15,
    width: "100%",
    padding: 14,
    borderRadius: 16,
    border: "none",
    background: "linear-gradient(135deg,#6366f1,#a855f7)",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    cursor: "pointer",
  },

  noticeList: {
    marginTop: 25,
  },

  notice: {
    background: "linear-gradient(135deg,#1e293b,#312e81)",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
  },

  noticeText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#e0e7ff",
  },

  time: {
    fontSize: 12,
    color: "#a5b4fc",
  },

  deleteBtn: {
    background: "linear-gradient(135deg,#fecaca,#fb7185)",
    border: "none",
    borderRadius: "50%",
    width: 38,
    height: 38,
    cursor: "pointer",
    fontSize: 16,
  },
};
