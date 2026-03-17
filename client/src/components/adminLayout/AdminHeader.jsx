import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.header}>
      <h2 style={{ margin: 0 }}>🎓 Admin Panel</h2>

      <div style={{ position: "relative" }} ref={menuRef}>
        <FaEllipsisV
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div style={styles.dropdown}>
            <div style={styles.item} onClick={() => navigate("/admin/settings")}>
              ⚙ Settings
            </div>

            <div style={styles.item} onClick={() => navigate("/admin/change-password")}>
              🔐 Change Password
            </div>

            {/* ✅ NEW DOUBTS LINK */}
            <div style={styles.item} onClick={() => navigate("/admin/doubts")}>
              ❓ Student Doubts
            </div>

            <div style={styles.item} onClick={logout}>
              🚪 Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "linear-gradient(to right, #5f2c82, #49a09d)",
    color: "white",
  },
  dropdown: {
    position: "absolute",
    top: "30px",
    right: "0",
    background: "white",
    color: "#681c1c",
    width: "180px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    overflow: "hidden",
    zIndex: 1000,
  },
  item: {
    padding: "12px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
};