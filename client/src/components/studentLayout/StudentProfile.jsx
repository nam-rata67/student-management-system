import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBook,
  FaCalendarAlt,
  FaCamera,
} from "react-icons/fa";

const API_BASE = "https://student-management-system-uidc.onrender.com/api/admin";

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    course: "",
    year: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const admin = JSON.parse(localStorage.getItem("user"));
      if (!admin) return;

      const res = await axios.get(`${API_BASE}/profile/${admin._id}`);
      setProfile(res.data);
      setFormData(res.data);
    } catch {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const admin = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        `${API_BASE}/profile/${admin._id}`,
        formData
      );

      setProfile(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setSuccess("Profile updated successfully ✅");
      setIsEditing(false);
    } catch {
      setError("Update failed");
    }
  };

  if (loading) {
    return (
      <div style={loader}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <div style={bg}>
      <Card style={card}>
        {/* ===== AVATAR ===== */}
        <div style={avatarWrapper}>
          <div style={avatar}>
            {imagePreview ? (
              <img src={imagePreview} alt="profile" style={avatarImg} />
            ) : (
              profile?.name?.charAt(0).toUpperCase()
            )}
          </div>

          <label style={cameraBtn}>
            <FaCamera />
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <h2 style={title}>{profile.name}</h2>
        <p style={subtitle}>Admin Profile</p>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {isEditing ? (
          <div style={editBox}>
            <h5 style={{ textAlign: "center", marginBottom: 20 }}>
              ✏️ Edit Profile
            </h5>

            <Form onSubmit={handleSubmit}>
              <Input icon={<FaUser />} label="Name" name="name" value={formData.name} onChange={handleChange} />
              <Input icon={<FaEnvelope />} label="Email" name="email" value={formData.email} onChange={handleChange} />
              <Input icon={<FaPhone />} label="Contact" name="contact" value={formData.contact} onChange={handleChange} />
              <Input icon={<FaBook />} label="Department" name="course" value={formData.course} onChange={handleChange} />
              <Input icon={<FaCalendarAlt />} label="Experience" name="year" value={formData.year} onChange={handleChange} />

              <Button style={saveBtn} type="submit">💾 Save</Button>
              <Button style={cancelBtn} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Form>
          </div>
        ) : (
          <>
            <Info icon={<FaEnvelope />} label="Email" value={profile.email} />
            <Info icon={<FaPhone />} label="Contact" value={profile.contact || "-"} />
            <Info icon={<FaBook />} label="Department" value={profile.course || "-"} />
            <Info icon={<FaCalendarAlt />} label="Experience" value={profile.year || "-"} />
            <Info icon={<FaUser />} label="Role" value={profile.role} />

            <Button style={editBtn} onClick={() => setIsEditing(true)}>
              ✨ Edit Profile
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}

/* ===== SMALL COMPONENTS ===== */

const Input = ({ icon, label, ...props }) => (
  <div style={{ marginBottom: 15 }}>
    <label style={labelStyle}>
      {icon} {label}
    </label>
    <Form.Control {...props} style={input} />
  </div>
);

const Info = ({ icon, label, value }) => (
  <div style={row}>
    <span style={{ marginRight: 12 }}>{icon}</span>
    <div>
      <b>{label}</b>
      <div>{value}</div>
    </div>
  </div>
);

/* ===== STYLES ===== */

const bg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#1d2671,#c33764)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: 450,
  padding: 35,
  borderRadius: 22,
  background: "rgba(255,255,255,0.18)",
  backdropFilter: "blur(15px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
  color: "white",
};

const avatarWrapper = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginBottom: 10,
};

const avatar = {
  width: 90,
  height: 90,
  borderRadius: "50%",
  background: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 36,
  fontWeight: "bold",
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
  right: "35%",
  width: 34,
  height: 34,
  borderRadius: "50%",
  background: "#ff3d68",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const title = { textAlign: "center" };
const subtitle = { textAlign: "center", opacity: 0.8, marginBottom: 20 };

const editBox = {
  background: "rgba(0,0,0,0.25)",
  padding: 25,
  borderRadius: 18,
};

const input = {
  padding: 12,
  borderRadius: 10,
  fontSize: 15,
};

const labelStyle = { fontWeight: 600, marginBottom: 5 };

const row = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.2)",
  padding: 12,
  borderRadius: 12,
  marginBottom: 12,
};

const editBtn = {
  width: "100%",
  marginTop: 20,
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg,#ff512f,#dd2476)",
};

const saveBtn = {
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: 12,
  border: "none",
  background: "linear-gradient(135deg,#00b09b,#96c93d)",
};

const cancelBtn = {
  width: "100%",
  padding: 12,
  borderRadius: 12,
  border: "none",
  background: "#6c757d",
};

const loader = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#000",
};
