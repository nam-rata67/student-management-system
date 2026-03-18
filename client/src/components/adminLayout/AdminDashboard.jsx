import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", password: "" });

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://student-management-system-using-mern-in35.onrender.com/api/users");
      setStudents(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const approveStudent = async (id) => {
    await axios.put(`https://student-management-system-uidc.onrender.com/api/users/approve/${id}`);
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Delete this student?")) {
      await axios.delete(`https://student-management-system-uidc.onrender.com/api/users/${id}`);
      fetchStudents();
    }
  };

  const addStudent = async () => {
    if (!newStudent.name || !newStudent.email || !newStudent.password) return;

    await axios.post("https://student-management-system-uidc.onrender.com/api/users/register", {
      ...newStudent,
      status: "approved",
    });

    setNewStudent({ name: "", email: "", password: "" });
    setShowModal(false);
    fetchStudents();
  };

  // Stats
  const total = students.length;
  const approved = students.filter((s) => s.status === "approved").length;
  const pending = students.filter((s) => s.status === "pending").length;
  const approvedPercent = total ? Math.round((approved / total) * 100) : 0;

  const filtered = students.filter((s) => {
    const name = (s.name || "").toLowerCase();
    const email = (s.email || "").toLowerCase();
    return name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  return (
    <div style={styles.page}>
      <motion.h1
        style={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🎓 Admin Dashboard
      </motion.h1>

      {/* ================== Stats Cards ================== */}
      <motion.div
        style={styles.cards}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ ...styles.card, background: "linear-gradient(135deg,#0ea5e9,#3b82f6)" }}>
          Total<br />
          <b>{total}</b>
        </div>
        <div style={{ ...styles.card, background: "linear-gradient(135deg,#10b981,#059669)" }}>
          Approved<br />
          <b>{approved}</b>
        </div>
        <div style={{ ...styles.card, background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
          Pending<br />
          <b>{pending}</b>
        </div>
      </motion.div>

      {/* ================== Donut Chart Section ================== */}
      <motion.div
        style={styles.chartSection}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Badge Tag */}
        <div style={styles.chartBadge}>Approval Rate</div>

        {/* Donut Chart */}
        <div style={{ position: "relative", width: 180, height: 180 }}>
          <motion.div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `conic-gradient(#10b981 0deg, #10b981 ${approvedPercent * 3.6}deg, #f59e0b ${approvedPercent * 3.6}deg, #f59e0b 360deg)`,
            }}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2 }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: "#0f172a",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontWeight: "700",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <b style={{ fontSize: 24 }}>{approvedPercent}%</b>
            <span style={{ fontSize: 14, color: "#aaa" }}>Approved</span>
          </div>
        </div>
      </motion.div>

      {/* ================== Search & Table Header ================== */}
      <input
        type="text"
        placeholder="🔍 Search student..."
        style={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.tableHeader}>
        <h2>📋 Student List</h2>
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>
          ➕ Add Student
        </button>
      </div>

      {/* ================== Student Table ================== */}
      <div style={styles.tableBox}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s._id}>
                  <td style={styles.td}>{s.name}</td>
                  <td style={styles.td}>{s.email}</td>
                  <td style={styles.td}>{s.status === "approved" ? "✅ Approved" : "⏳ Pending"}</td>
                  <td style={styles.td}>
                    {s.status === "pending" && (
                      <button style={styles.approveBtn} onClick={() => approveStudent(s._id)}>
                        Approve
                      </button>
                    )}
                    <button style={styles.deleteBtn} onClick={() => deleteStudent(s._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================== Add Student Modal ================== */}
      {showModal && (
        <div style={styles.modalBg}>
          <motion.div
            style={styles.modal}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3>Add New Student</h3>
            <input
              placeholder="Name"
              style={styles.input}
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <input
              placeholder="Email"
              style={styles.input}
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            />
            <input
              placeholder="Password"
              type="password"
              style={styles.input}
              value={newStudent.password}
              onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
            />

            <button style={styles.saveBtn} onClick={addStudent}>
              Save & Allow Login
            </button>
            <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    padding: 20,
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
  },
  title: { textAlign: "center", marginBottom: 20, fontWeight: "700" },

  // Cards
  cards: { display: "flex", justifyContent: "space-around", gap: 15, flexWrap: "wrap" },
  card: {
    padding: 20,
    borderRadius: 16,
    width: 180,
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    fontWeight: "600",
    color: "#fff",
    cursor: "default",
  },

  // Donut Chart Section
  chartSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 20,
    padding: 30,
    margin: "30px 0",
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
    position: "relative",
  },
  chartBadge: {
    position: "absolute",
    top: 15,
    left: 15,
    background: "#10b981",
    padding: "4px 12px",
    borderRadius: 12,
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },

  search: { width: "100%", padding: 12, borderRadius: 10, marginBottom: 10, border: "none" },
  tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  addBtn: { background: "#10b981", border: "none", padding: "8px 14px", borderRadius: 8, color: "#fff", cursor: "pointer" },

  tableBox: { background: "rgba(255,255,255,0.05)", padding: 20, borderRadius: 16 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: 10, textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.2)" },
  td: { padding: 10, borderBottom: "1px solid rgba(255,255,255,0.1)" },
  approveBtn: { background: "#10b981", border: "none", padding: "5px 10px", marginRight: 6, borderRadius: 6, cursor: "pointer" },
  deleteBtn: { background: "#f59e0b", border: "none", padding: "5px 10px", borderRadius: 6, cursor: "pointer" },

  modalBg: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { background: "#1e293b", padding: 20, borderRadius: 12, width: 320 },
  input: { width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "none" },
  saveBtn: { background: "#10b981", width: "100%", padding: 10, border: "none", borderRadius: 8, cursor: "pointer", fontWeight: "600" },
  cancelBtn: { background: "#f59e0b", width: "100%", padding: 10, border: "none", marginTop: 6, borderRadius: 8, cursor: "pointer", fontWeight: "600" },
};
