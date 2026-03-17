import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentNotes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/notes")
      .then(res => setNotes(res.data));
  }, []);

  return (
    <div style={container}>
      <h2 style={heading}>📚 Available Notes</h2>
      <p style={subHeading}>Click to open or download your study material</p>

      <div style={grid}>
        {notes.map(n => (
          <div key={n._id} style={card}>
            
            <div style={icon}>📄</div>

            <h3 style={title}>{n.title}</h3>

            <div style={btnRow}>
              <a
                href={`http://localhost:8000/uploads/${n.file}`}
                target="_blank"
                rel="noreferrer"
                style={openBtn}
              >
                Open
              </a>

              <a
                href={`http://localhost:8000/uploads/${n.file}`}
                download
                style={downloadBtn}
              >
                Download
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  padding: "40px 20px",
  background: "linear-gradient(135deg,#1e3c72,#2a5298)",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
  color: "#fff"
};

const heading = {
  textAlign: "center",
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "6px"
};

const subHeading = {
  textAlign: "center",
  opacity: 0.8,
  marginBottom: "30px",
  fontSize: "15px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "25px"
};

const card = {
  background: "rgba(255,255,255,0.1)",
  padding: "25px",
  borderRadius: "20px",
  textAlign: "center",
  backdropFilter: "blur(15px)",
  boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
  transition: "0.3s",
  cursor: "pointer",
};

const icon = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#4f46e5,#6366f1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "26px",
  color: "#fff",
  margin: "0 auto 15px",
};

const title = {
  fontSize: "18px",
  fontWeight: "600",
  marginBottom: "20px",
  color: "#fff",
};

const btnRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
};

const openBtn = {
  flex: 1,
  textDecoration: "none",
  background: "linear-gradient(90deg,#4f46e5,#6366f1)",
  color: "#fff",
  padding: "12px",
  borderRadius: "12px",
  fontWeight: "600",
  transition: "0.3s",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
};

const downloadBtn = {
  flex: 1,
  textDecoration: "none",
  background: "linear-gradient(90deg,#10b981,#22c55e)",
  color: "#fff",
  padding: "12px",
  borderRadius: "12px",
  fontWeight: "600",
  transition: "0.3s",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
};

/* Hover Effects */
Object.assign(card, {
  ":hover": { transform: "translateY(-5px)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }
});
Object.assign(openBtn, {
  ":hover": { opacity: 0.9 }
});
Object.assign(downloadBtn, {
  ":hover": { opacity: 0.9 }
});