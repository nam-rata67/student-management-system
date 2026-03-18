import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import {
  FaCamera,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const API_BASE = "https://student-management-system-using-mern-in35.onrender.com/api/admin";

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(`${API_BASE}/profile/${user._id}`);
      setProfile(res.data);
      setForm(res.data);
    } catch (err) {
      console.log("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(`${API_BASE}/profile/${user._id}`, form);
      setProfile(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setEdit(false);
    } catch {
      alert("Update failed");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  if (loading) {
    return (
      <div style={loader}>
        <Spinner />
      </div>
    );
  }

  return (
    <div style={page}>
      <Card style={card}>
        {/* AVATAR */}
        <div style={avatarWrapper}>
          <div style={avatar}>
            {image ? (
              <img src={image} alt="profile" style={avatarImg} />
            ) : (
              profile.name?.charAt(0).toUpperCase()
            )}
          </div>

          <label style={cameraBtn}>
            <FaCamera />
            <input type="file" hidden onChange={handleImageUpload} />
          </label>
        </div>

        {/* NAME */}
        <h3 style={name}>{profile.name}</h3>
        <p style={subtitle}>ADMIN PROFILE</p>

        {/* VIEW MODE */}
        {!edit && (
          <>
            <Info label="Email" value={profile.email} />
            <Info label="Contact" value={profile.contact || "-"} />
            <Info label="Department" value={profile.course || "-"} />
            <Info label="Experience" value={profile.year || "-"} />
            <Info label="Role" value={profile.role} />

            <Button style={editBtn} onClick={() => setEdit(true)}>
              ✨ Edit Profile
            </Button>
          </>
        )}

        {/* EDIT MODE */}
        {edit && (
          <div style={editBox}>
            <Input label="Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} />
            <Input label="Contact" name="contact" value={form.contact} onChange={handleChange} />
            <Input label="Department" name="course" value={form.course} onChange={handleChange} />
            <Input label="Experience" name="year" value={form.year} onChange={handleChange} />

            <Button style={saveBtn} onClick={handleSave}>
              <FaSave /> Save Changes
            </Button>

            <Button style={cancelBtn} onClick={() => setEdit(false)}>
              <FaTimes /> Cancel
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

/* SMALL COMPONENTS */

const Info = ({ label, value }) => (
  <div style={infoRow}>
    <span>{label}</span>
    <b>{value}</b>
  </div>
);

const Input = ({ label, ...props }) => (
  <Form.Group style={{ marginBottom: 14 }}>
    <Form.Label style={{ fontSize: 13 }}>{label}</Form.Label>
    <Form.Control {...props} style={input} />
  </Form.Group>
);

/* STYLES */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#4b1d5e,#9b2c66)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: 430,
  padding: 30,
  borderRadius: 28,
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(18px)",
  boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
  color: "white",
  textAlign: "center",
};

const avatarWrapper = { position: "relative", marginBottom: 10 };

const avatar = {
  width: 95,
  height: 95,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#ffb6b9,#fcd5ce)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 38,
  fontWeight: "bold",
  margin: "0 auto",
  color: "#333",
  overflow: "hidden",
};

const avatarImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const cameraBtn = {
  position: "absolute",
  bottom: 0,
  right: "38%",
  background: "#ff3d68",
  width: 34,
  height: 34,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const name = {
  marginTop: 12,
  fontWeight: 600,
};

const subtitle = {
  opacity: 0.75,
  fontSize: 14,
  marginBottom: 22,
  letterSpacing: 1,
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  background: "rgba(255,255,255,0.22)",
  padding: 12,
  borderRadius: 14,
  marginBottom: 10,
};

const editBox = {
  marginTop: 20,
  padding: 18,
  borderRadius: 20,
  background: "rgba(255,255,255,0.18)",
};

const input = {
  borderRadius: 12,
  padding: "10px 12px",
};

const editBtn = {
  width: "100%",
  marginTop: 26,
  padding: "10px 0",
  fontSize: 15,
  fontWeight: 600,
  background: "linear-gradient(135deg,#ff512f,#dd2476)",
  border: "none",
  borderRadius: 14,
};

const saveBtn = {
  width: "100%",
  marginTop: 15,
  padding: "10px 0",
  fontWeight: 600,
  background: "linear-gradient(135deg,#00b09b,#96c93d)",
  border: "none",
  borderRadius: 14,
};

const cancelBtn = {
  width: "100%",
  marginTop: 10,
  padding: "10px 0",
  background: "#6c757d",
  border: "none",
  borderRadius: 14,
};

const loader = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
