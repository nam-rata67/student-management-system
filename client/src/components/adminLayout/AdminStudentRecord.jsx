import { useState } from "react";
import axios from "axios";

export default function AdminStudentRecord() {
  const [form, setForm] = useState({
    email: "",
    presentDays: "",
    absentDays: "",
    totalDays: "",
    totalFee: "",
    paidFee: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      await axios.post("https://student-management-system-uidc.onrender.com/api/student-record/add", form);
      alert("Record saved successfully");
    } catch {
      alert("Error saving record");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={title}>Student Record</h2>
        <p style={subtitle}>Attendance & Fee Details</p>

        <Input label="Student Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Present Days" name="presentDays" value={form.presentDays} onChange={handleChange} />
        <Input label="Absent Days" name="absentDays" value={form.absentDays} onChange={handleChange} />
        <Input label="Total Days" name="totalDays" value={form.totalDays} onChange={handleChange} />
        <Input label="Total Fee (₹)" name="totalFee" value={form.totalFee} onChange={handleChange} />
        <Input label="Paid Fee (₹)" name="paidFee" value={form.paidFee} onChange={handleChange} />

        <button style={btn} onClick={submit}>Save Record</button>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
const Input = ({ label, ...props }) => (
  <div style={inputBox}>
    <label style={labelStyle}>{label}</label>
    <input {...props} style={input} />
  </div>
);

/* ===== STYLES (SOFT THEME) ===== */

const page = {
  minHeight: "100vh",
  background: "#f8fafc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: 420,
  background: "#ffffff",
  padding: 28,
  borderRadius: 14,
  boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
};

const title = {
  textAlign: "center",
  color: "#1e3a8a",
  marginBottom: 6,
};

const subtitle = {
  textAlign: "center",
  fontSize: 14,
  color: "#64748b",
  marginBottom: 24,
};

const inputBox = {
  display: "flex",
  flexDirection: "column",
  marginBottom: 14,
};

const labelStyle = {
  fontSize: 13,
  marginBottom: 6,
  color: "#475569",
};

const input = {
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #cbd5f5",
  fontSize: 14,
  outline: "none",
};

const btn = {
  width: "100%",
  marginTop: 18,
  padding: "12px",
  borderRadius: 10,
  border: "none",
  background: "#4f46e5",
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};
