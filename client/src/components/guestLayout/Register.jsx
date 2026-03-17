import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    course: "",
    year: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:8000/api/users/register", formData);
      setMessage("Registration successful. Wait for admin approval.");

      setFormData({
        name: "",
        email: "",
        password: "",
        contact: "",
        course: "",
        year: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <motion.div
        style={styles.glassCard}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.title}>Create Account ✨</h2>

        {/* 🔥 subtitle improved */}
        <p style={styles.subtitle}>
          Register to access the Student Management Portal
        </p>

        {message && <div style={styles.message}>{message}</div>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <span
              style={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Select Course</option>
            <option value="BCA">BCA</option>
            <option value="BSC">BSC</option>
            <option value="BE">BE</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
            <option value="4th">4th Year</option>
            <option value="Completed">Completed</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={styles.btn}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </motion.button>
        </form>

        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;

/* ================= STYLES ================= */

const styles = {

page:{
minHeight:"100vh",
background:"radial-gradient(circle at top,#020617,#000)",
display:"flex",
justifyContent:"center",
alignItems:"center",
position:"relative",
overflow:"hidden",
fontFamily:"Poppins"
},

blob1:{
position:"absolute",
width:300,
height:300,
background:"linear-gradient(135deg,#22c55e,#38bdf8)",
filter:"blur(120px)",
top:-60,
left:-60
},

blob2:{
position:"absolute",
width:300,
height:300,
background:"linear-gradient(135deg,#a855f7,#ec4899)",
filter:"blur(120px)",
bottom:-60,
right:-60
},

glassCard:{
width:420,
padding:35,
borderRadius:20,
background:"rgba(255,255,255,0.12)",
backdropFilter:"blur(20px)",
border:"1px solid rgba(255,255,255,0.2)",
boxShadow:"0 30px 60px rgba(0,0,0,0.6)",
color:"#fff",
zIndex:1
},

title:{
textAlign:"center",
fontSize:26,
fontWeight:700
},

subtitle:{
textAlign:"center",
fontSize:14,
marginBottom:25,
color:"#cbd5f5"
},

input:{
width:"100%",
padding:"14px",
marginBottom:"18px",
borderRadius:"12px",
border:"1px solid #e5e7eb",
background:"#ffffff",
color:"#020617",
outline:"none",
boxSizing:"border-box"
},

select:{
width:"100%",
padding:"14px",
marginBottom:"18px",
borderRadius:"12px",
border:"1px solid #e5e7eb",
background:"#ffffff",
color:"#020617",
outline:"none",
boxSizing:"border-box"
},

eye:{
position:"absolute",
right:14,
top:"50%",
transform:"translateY(-50%)",
cursor:"pointer"
},

btn:{
width:"100%",
padding:14,
borderRadius:12,
border:"none",
background:"linear-gradient(135deg,#22c55e,#38bdf8)",
color:"#020617",
fontWeight:700,
cursor:"pointer",
marginTop:10
},

loginText:{
textAlign:"center",
marginTop:18,
fontSize:14,
color:"#cbd5f5"
},

link:{
color:"#38bdf8",
textDecoration:"none",
fontWeight:600
},

message:{
background:"rgba(34,197,94,0.15)",
padding:10,
borderRadius:8,
fontSize:13,
marginBottom:14,
textAlign:"center",
color:"#bbf7d0"
}

};