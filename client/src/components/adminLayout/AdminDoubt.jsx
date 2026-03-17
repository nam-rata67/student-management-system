import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDoubt() {
  const [doubts, setDoubts] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [replyFile, setReplyFile] = useState({});

  const loadDoubts = async () => {
    const res = await axios.get("http://localhost:8000/api/doubts/all");
    setDoubts(res.data);
  };

  useEffect(() => {
    loadDoubts();
  }, []);

  const sendReply = async (id) => {
    const formData = new FormData();
    formData.append("adminReply", replyText[id]);

    if (replyFile[id]) {
      formData.append("adminFile", replyFile[id]);
    }

    await axios.post(
      `http://localhost:8000/api/doubts/reply/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Reply Sent");
    loadDoubts();
  };

  const deleteDoubt = async (id) => {
    if (!window.confirm("Delete this doubt?")) return;
    await axios.delete(`http://localhost:8000/api/doubts/${id}`);
    loadDoubts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Doubt Panel</h2>

      {doubts.map((d) => (
        <div key={d._id} style={{
          border: "1px solid #ccc",
          padding: 15,
          margin: 15,
          borderRadius: 10
        }}>

          <p><b>Student:</b> {d.studentName}</p>
          <p><b>Subject:</b> {d.subject}</p>
          <p><b>Doubt:</b> {d.doubt}</p>
          <p><b>Status:</b> {d.status}</p>

          {d.studentFile && (
            <a href={`http://localhost:8000/uploads/${d.studentFile}`} target="_blank" rel="noreferrer">
              📎 Student File
            </a>
          )}

          {/* Emoji feedback */}
          {d.feedbackEmoji && (
            <p style={{ fontSize: 20 }}>
              Student Reaction: {d.feedbackEmoji}
            </p>
          )}

          {/* Reply Box */}
          {d.status !== "Answered" && (
            <>
              <textarea
                placeholder="Write reply"
                style={{ width: "100%", height: 70 }}
                onChange={(e) =>
                  setReplyText({ ...replyText, [d._id]: e.target.value })
                }
              />
              <br />

              <input
                type="file"
                onChange={(e) =>
                  setReplyFile({ ...replyFile, [d._id]: e.target.files[0] })
                }
              />
              <br />

              <button onClick={() => sendReply(d._id)}>Send Reply</button>
            </>
          )}

          {/* Answered */}
          {d.status === "Answered" && (
            <>
              <p style={{ color: "green" }}>
                <b>Admin Reply:</b> {d.adminReply}
              </p>

              {d.adminFile && (
                <a href={`http://localhost:8000/uploads/${d.adminFile}`} target="_blank" rel="noreferrer">
                  📂 Admin File
                </a>
              )}
            </>
          )}

          <br />
          <button
            onClick={() => deleteDoubt(d._id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: 5,
              cursor: "pointer",
              marginTop: 10
            }}
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDoubt;