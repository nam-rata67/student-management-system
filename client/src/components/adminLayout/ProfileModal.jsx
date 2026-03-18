import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaBook, FaCalendarAlt } from "react-icons/fa";

const API_BASE = "https://student-management-system-using-mern-in35.onrender.com/api/users";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      const res = await axios.get(`${API_BASE}/profile/${user._id}`);
      setProfile(res.data);
      setFormData(res.data);
    } catch (err) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.put(
        `${API_BASE}/profile/${user._id}`,
        formData
      );

      setProfile(res.data);
      setIsEditing(false);
      setSuccess("Profile Updated Successfully ✅");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      setError("Update failed");
    }
  };

  if (loading) {
    return (
      <div style={loaderStyle}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  return (
    <div style={bgStyle}>
      <Card style={glassCard}>

        {/* Avatar */}
        <div style={avatarCircle}>
          {profile?.name?.charAt(0).toUpperCase()}
        </div>

        <h2 style={titleStyle}>{profile?.name}</h2>
        <p style={subTitle}>Student Profile</p>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {isEditing ? (
          <div style={editBox}>
            <h4 style={{ textAlign: "center", marginBottom: "20px" }}>
              ✏️ Edit Profile
            </h4>

            <Form onSubmit={handleSubmit}>
              <InputRow label="Full Name" icon={<FaUser />} name="name" value={formData.name} onChange={handleChange} />
              <InputRow label="Email" icon={<FaEnvelope />} name="email" value={formData.email} onChange={handleChange} />
              <InputRow label="Contact" icon={<FaPhone />} name="contact" value={formData.contact} onChange={handleChange} />
              <InputRow label="Course" icon={<FaBook />} name="course" value={formData.course} onChange={handleChange} />
              <InputRow label="Year" icon={<FaCalendarAlt />} name="year" value={formData.year} onChange={handleChange} />

              <Button style={saveBtn} type="submit">💾 Save Changes</Button>
              <Button style={cancelBtn} onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Form>
          </div>
        ) : (
          <div style={infoGrid}>
            <InfoRow icon={<FaEnvelope />} label="Email" value={profile.email} />
            <InfoRow icon={<FaPhone />} label="Contact" value={profile.contact} />
            <InfoRow icon={<FaBook />} label="Course" value={profile.course} />
            <InfoRow icon={<FaCalendarAlt />} label="Year" value={profile.year} />
            <InfoRow icon={<FaUser />} label="Role" value={profile.role} />

            <Button style={editBtn} onClick={() => setIsEditing(true)}>
              ✨ Edit Profile
            </Button>
          </div>
        )}

      </Card>
    </div>
  );
};

export default Profile;

/* ===== Components ===== */

const InputRow = ({ icon, label, name, value, onChange }) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={labelStyle}>
      {icon} {label}
    </label>
    <Form.Control
      name={name}
      value={value}
      onChange={onChange}
      style={inputBig}
      placeholder={label}
    />
  </div>
);

const InfoRow = ({ icon, label, value }) => (
  <div style={rowStyle}>
    <span style={iconStyle}>{icon}</span>
    <div>
      <b>{label}</b>
      <div>{value}</div>
    </div>
  </div>
);

/* ===== Styles ===== */

const bgStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#1d2671,#c33764)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const glassCard = {
  width: "450px",
  padding: "35px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.18)",
  backdropFilter: "blur(15px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
  color: "white",
  border: "1px solid rgba(255,255,255,0.3)",
};

const avatarCircle = {
  width: "85px",
  height: "85px",
  borderRadius: "50%",
  background: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "34px",
  fontWeight: "bold",
  margin: "0 auto 10px auto",
  color: "#333",
};

const titleStyle = { textAlign: "center", marginBottom: "5px" };
const subTitle = { textAlign: "center", opacity: 0.8, marginBottom: "20px" };

const editBox = {
  background: "rgba(0,0,0,0.25)",
  padding: "25px",
  borderRadius: "18px",
};

const inputBig = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  fontSize: "16px",
};

const labelStyle = {
  marginBottom: "6px",
  display: "block",
  fontWeight: "600",
};

const iconStyle = { fontSize: "18px", marginRight: "12px" };

const rowStyle = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255,255,255,0.2)",
  padding: "12px",
  borderRadius: "12px",
  marginBottom: "12px",
};

const infoGrid = { marginTop: "10px" };

const editBtn = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  background: "linear-gradient(135deg,#ff512f,#dd2476)",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
};

const saveBtn = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  background: "linear-gradient(135deg,#00b09b,#96c93d)",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
};

const cancelBtn = {
  width: "100%",
  padding: "12px",
  background: "#6c757d",
  border: "none",
  borderRadius: "12px",
};

const loaderStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#000",
};
