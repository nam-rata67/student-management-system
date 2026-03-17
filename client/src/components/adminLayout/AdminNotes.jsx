import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminNotes() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await axios.get("https://student-management-system-uidc.onrender.com/api/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const submit = async () => {
    if (!title || !file) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    await axios.post("https://student-management-system-uidc.onrender.com/api/notes/add", formData);
    alert("✅ Note Uploaded Successfully");

    setTitle("");
    setFile(null);
    fetchNotes();
  };

  const del = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    await axios.delete(`https://student-management-system-uidc.onrender.com/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div style={page}>
      {/* Upload Box */}
      <div style={box}>
        <h2 style={titleStyle}>Notes Management</h2>
        <p style={subtitle}>Upload PDF / Image for students</p>

        <div style={formBox}>
          <input
            style={input}
            placeholder="Enter Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            style={fileInput}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button style={uploadBtn} onClick={submit}>
            Upload Note
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div style={listBox}>
        <h3 style={listTitle}>Uploaded Notes</h3>

        {notes.length === 0 && <p>No notes uploaded yet</p>}

        <div style={list}>
          {notes.map((n) => (
            <div key={n._id} style={rowCard}>
              <div style={left}>
                <span style={fileIcon}>📄</span>
                <span style={noteTitle}>{n.title}</span>
              </div>

              <div style={btnRow}>
                <a
                  href={`https://student-management-system-uidc.onrender.com/uploads/${n.file}`}
                  target="_blank"
                  rel="noreferrer"
                  style={viewBtn}
                >
                  Open
                </a>

                <button style={deleteBtn} onClick={() => del(n._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const page = {
  minHeight: "100vh",
  background: "#f4f6fb",
  padding: "30px",
  fontFamily: "Segoe UI",
};

const box = {
  background: "white",
  padding: "25px",
  borderRadius: "16px",
  maxWidth: "550px",
  margin: "0 auto",
  boxShadow: "0 10px 25px rgba(0,0,0,.1)",
};

const titleStyle = {
  marginBottom: "6px",
  textAlign: "center",
  fontSize: "24px",
};

const subtitle = {
  opacity: 0.6,
  marginBottom: "20px",
  textAlign: "center",
};

const formBox = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const input = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
};

const fileInput = {
  padding: "8px",
};

const uploadBtn = {
  background: "linear-gradient(90deg,#4f46e5,#6366f1)",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
};

const listBox = {
  marginTop: "35px",
};

const listTitle = {
  fontSize: "20px",
  marginBottom: "12px",
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const rowCard = {
  background: "white",
  padding: "10px 14px",
  borderRadius: "10px",
  boxShadow: "0 3px 8px rgba(0,0,0,.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const left = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const fileIcon = {
  fontSize: "20px",
};

const noteTitle = {
  fontSize: "14px",
  fontWeight: "600",
  maxWidth: "200px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const btnRow = {
  display: "flex",
  gap: "8px",
};

const viewBtn = {
  background: "#22c55e",
  color: "white",
  padding: "5px 10px",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "12px",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "12px",
};
