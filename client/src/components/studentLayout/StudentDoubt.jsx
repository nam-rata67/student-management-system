import { useState, useEffect } from "react";
import axios from "axios";

function StudentDoubt() {
  const [subject, setSubject] = useState("");
  const [doubt, setDoubt] = useState("");
  const [file, setFile] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [showEmoji, setShowEmoji] = useState({});

  const student = JSON.parse(localStorage.getItem("user"));

  const loadDoubts = async () => {
    const res = await axios.get("http://localhost:8000/api/doubts/all");
    const myDoubts = res.data.filter(
      (d) => d.studentName === student.name
    );
    setDoubts(myDoubts);
  };

  useEffect(() => {
    loadDoubts();
  }, []);

  const submitDoubt = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("studentName", student.name);
    formData.append("subject", subject);
    formData.append("doubt", doubt);
    if (file) formData.append("studentFile", file);

    await axios.post("http://localhost:8000/api/doubts", formData);

    setSubject("");
    setDoubt("");
    setFile(null);
    loadDoubts();
  };

  const sendFeedback = async (id, emoji) => {
    await axios.post(`http://localhost:8000/api/doubts/feedback/${id}`, {
      emoji,
    });
    loadDoubts();
  };

  return (
    <div style={styles.page}>
      {/* Main container */}
      <div style={styles.container}>
        {/* Left Side - Input Box */}
        <div style={styles.inputBox}>
          <h3 style={styles.heading}>Ask Your Doubt</h3>

          <input
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={styles.input}
          />

          <textarea
            placeholder="Write your question..."
            value={doubt}
            onChange={(e) => setDoubt(e.target.value)}
            required
            style={styles.textarea}
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
          />

          <button style={styles.sendBtn} onClick={submitDoubt}>
            Send ➤
          </button>
        </div>

        {/* Below the Input Box - Your Doubts Section */}
        <div style={styles.chatArea}>
          <h3 style={styles.heading}>Your Doubts</h3>
          {doubts.map((d) => (
            <div key={d._id} style={styles.doubtCard}>
              <div style={styles.doubtHeader}>
                <b style={styles.doubtSubject}>{d.subject}</b>
                {d.studentFile && (
                  <a
                    href={`http://localhost:8000/uploads/${d.studentFile}`}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.fileLink}
                  >
                    📎 Your File
                  </a>
                )}
              </div>
              <p style={styles.doubtText}>{d.doubt}</p>

              {/* Admin Reply */}
              {d.adminReply && (
                <div style={styles.adminBubble}>
                  <b style={styles.adminText}>Admin:</b> {d.adminReply}

                  {d.adminFile && (
                    <div>
                      <a
                        href={`http://localhost:8000/uploads/${d.adminFile}`}
                        target="_blank"
                        rel="noreferrer"
                        style={styles.fileLink}
                      >
                        📂 Admin File
                      </a>
                    </div>
                  )}

                  {/* Emoji button */}
                  <button
                    onClick={() =>
                      setShowEmoji({ ...showEmoji, [d._id]: !showEmoji[d._id] })
                    }
                    style={styles.emojiBtn}
                  >
                    😊 Feedback
                  </button>

                  {/* Emoji panel */}
                  {showEmoji[d._id] && (
                    <div style={styles.emojiPanel}>
                      <span onClick={() => sendFeedback(d._id, "🔥")} style={styles.emojiIcon}>
                        🔥
                      </span>
                      <span onClick={() => sendFeedback(d._id, "😍")} style={styles.emojiIcon}>
                        😍
                      </span>
                      <span onClick={() => sendFeedback(d._id, "😐")} style={styles.emojiIcon}>
                        😐
                      </span>
                      <span onClick={() => sendFeedback(d._id, "😡")} style={styles.emojiIcon}>
                        😡
                      </span>
                    </div>
                  )}

                  {d.feedbackEmoji && (
                    <p style={styles.reaction}>
                      <b>Your reaction:</b> {d.feedbackEmoji}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== styles ===== */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #38bdf8, #22c55e)", 
    padding: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  container: {
    display: "flex",
    flexDirection: "column",  // Vertical stack instead of side-by-side
    gap: "50px",  // Increased gap between input form and chat area
    width: "100%",
    maxWidth: "1200px",
  },

  inputBox: {
    width: "100%",
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",  // Add more spacing between input elements
  },

  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },

  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    marginBottom: "10px",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    height: "120px",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    marginBottom: "10px",
    fontSize: "16px",
    resize: "none",
    boxSizing: "border-box",
  },

  fileInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    marginBottom: "10px",
    boxSizing: "border-box",
  },

  sendBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: "15px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "bold",
    boxSizing: "border-box",
  },

  chatArea: {
    width: "100%",
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
    overflowY: "auto", 
    maxHeight: "600px", // Allows scrolling when the chat gets large
  },

  doubtCard: {
    background: "#f0f8ff", 
    padding: "14px",  // Adjusted for smaller size
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },

  doubtHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  doubtSubject: {
    fontSize: "16px",  
    fontWeight: "bold",
  },

  doubtText: {
    fontSize: "14px",  
    color: "#333",
    marginTop: "10px",
  },

  adminBubble: {
    background: "#fff",
    padding: "14px",  
    borderRadius: "10px",
    borderLeft: "6px solid #38bdf8",
    marginTop: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },

  adminText: {
    fontWeight: "bold",
    color: "#38bdf8",
  },

  fileLink: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "bold",
  },

  emojiBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    marginTop: "12px",
    fontSize: "14px",
    color: "#38bdf8",
    transition: "all 0.3s ease",
  },

  emojiPanel: {
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "10px",
  },

  emojiIcon: {
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  reaction: {
    marginTop: "10px",
    color: "#38bdf8",
    fontWeight: "bold",
  },
};

export default StudentDoubt;