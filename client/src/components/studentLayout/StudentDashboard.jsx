import React, { useEffect, useState } from "react";
import axios from "axios";

export default function StudentDashboard() {
  const [record, setRecord] = useState({
    presentDays: 0,
    absentDays: 0,
    totalDays: 0,
    totalFee: 0,
    paidFee: 0,
  });
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/student-record/email/${email}`
        );
        if (res.data && Object.keys(res.data).length > 0) {
          setRecord(res.data);
        }
      } catch (err) {} finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email]);

  if (loading) return <div style={ui.loading}>⏳ Loading Dashboard...</div>;

  const attendancePercent =
    record.totalDays > 0
      ? Math.round((record.presentDays / record.totalDays) * 100)
      : 0;

  const pendingFee = record.totalFee - record.paidFee;
  const feePercent =
    record.totalFee > 0
      ? Math.round((record.paidFee / record.totalFee) * 100)
      : 0;

  return (
    <div style={ui.page}>
      <header style={ui.header}>
        <h1>🎓 Student Dashboard</h1>
        <p>Your academic & fee overview</p>
      </header>

      <div style={ui.cardGrid}>
        <StatCard title="Present Days" value={record.presentDays} gradient={["#6a11cb","#2575fc"]} />
        <StatCard title="Absent Days" value={record.absentDays} gradient={["#fc5c7d","#6a82fb"]} />
        <StatCard
          title="Attendance %"
          value={`${attendancePercent}%`}
          gradient={attendancePercent >= 75 ? ["#00b09b","#96c93d"] : ["#f79d00","#f04141"]}
        />
        <StatCard title="Fee Paid" value={`₹${record.paidFee}`} gradient={["#36d1dc","#5b86e5"]} />
      </div>

      <Section title="📊 Attendance Progress">
        <Progress percent={attendancePercent} threshold={75} />
        <div style={ui.statsRow}>
          <StatMini label="Present" value={record.presentDays} color="#22c55e" />
          <StatMini label="Absent" value={record.absentDays} color="#ef4444" />
          <StatMini label="Total" value={record.totalDays} color="#6366f1" />
        </div>
      </Section>

      <Section title="💰 Fee Status">
        <div style={ui.statsRow}>
          <StatMini label="Total Fee" value={`₹${record.totalFee}`} color="#4f46e5" />
          <StatMini label="Paid" value={`₹${record.paidFee}`} color="#16a34a" />
          <StatMini label="Pending" value={`₹${pendingFee}`} color="#f59e0b" />
        </div>
        <Progress percent={feePercent} threshold={100} label="Fee Completion" gradient={["#36d1dc","#5b86e5"]} />
      </Section>

      <Section title="⭐ Overall Performance">
        <Progress percent={attendancePercent} threshold={75} label="Attendance" />
        <Progress percent={feePercent} threshold={100} label="Fee Completion" />
        <p style={ui.note}>💡 Keep your attendance above 75% and clear your fees on time for better academic performance.</p>
      </Section>
    </div>
  );
}

/* COMPONENTS */
const StatCard = ({ title, value, gradient }) => (
  <div style={{ ...ui.statCard, background: `linear-gradient(135deg,${gradient[0]},${gradient[1]})` }}>
    <p style={{ opacity: 0.8 }}>{title}</p>
    <h2>{value}</h2>
  </div>
);

const StatMini = ({ label, value, color }) => (
  <div style={{ ...ui.miniCard, borderLeft: `4px solid ${color}` }}>
    <p>{label}</p>
    <h3>{value}</h3>
  </div>
);

const Section = ({ title, children }) => (
  <div style={ui.section}>
    <h2>{title}</h2>
    {children}
  </div>
);

const Progress = ({ percent, threshold = 75, label, gradient = ["#6366f1","#818cf8"] }) => (
  <div style={{ margin: "15px 0" }}>
    {label && <p>{label}</p>}
    <div style={ui.progressBar}>
      <div
        style={{
          ...ui.progressFill,
          width: `${percent}%`,
          background: percent >= threshold ? `linear-gradient(90deg,${gradient[0]},${gradient[1]})` : "#f87171",
        }}
      ></div>
    </div>
    <span style={{ fontWeight: 600 }}>{percent}%</span>
  </div>
);

/* STYLES */
const ui = {
  page: {
    minHeight: "100vh",
    padding: 40,
    fontFamily: "Inter, sans-serif",
    background: "linear-gradient(160deg,#e0eafc,#cfdef3)",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: 20,
    marginBottom: 30,
  },
  statCard: {
    padding: 25,
    borderRadius: 20,
    color: "white",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    transition: "0.3s",
    cursor: "pointer",
  },
  miniCard: {
    padding: 15,
    borderRadius: 12,
    background: "white",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },
  section: {
    marginTop: 30,
    padding: 25,
    borderRadius: 20,
    background: "white",
    boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
  },
  statsRow: {
    display: "flex",
    gap: 15,
    marginTop: 15,
    flexWrap: "wrap",
  },
  progressBar: {
    width: "100%",
    height: 14,
    background: "#e0e0e0",
    borderRadius: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 12,
    textAlign: "center",
    lineHeight: "14px",
    color: "white",
    fontWeight: 600,
    transition: "0.6s",
  },
  note: {
    marginTop: 20,
    fontStyle: "italic",
    opacity: 0.7,
  },
  loading: { padding: 50, textAlign: "center", fontSize: 20, opacity: 0.7 },
};