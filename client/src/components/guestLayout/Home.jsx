import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const learnMoreRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 800); // Slight delay for smoothness
  }, []);

  return (
    <div style={styles.page}>
      {/* ================= HERO ================= */}
      <section style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
          transition={{ duration: 1.2 }}
          style={styles.heroLeft}
        >
          <h1 style={styles.title}>Student Management System</h1>
          <p style={styles.subtitle}>
            A scalable and secure platform designed for educational institutions with a modern user interface.
          </p>

          <div style={styles.btnGroup}>
            <button style={styles.primaryBtn} onClick={() => navigate("/register")}>
              Get Started
            </button>
            <button
              style={styles.secondaryBtn}
              onClick={() =>
                learnMoreRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.9 }}
          transition={{ duration: 1.2 }}
          style={styles.heroRight}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80"
            alt="Students"
            style={styles.heroImg}
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Key Features</h2>

        <div style={styles.grid}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                rotate: 3,
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.98 }}
              style={styles.card}
            >
              <h3 style={styles.cardTitle}>{f.title}</h3>
              <p style={styles.cardDesc}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section ref={learnMoreRef} style={styles.about}>
        <h2 style={styles.sectionTitle}>About This Project</h2>
        <p style={styles.aboutText}>
          Built using the latest technologies to provide a seamless experience for students, admins, and academic management.
        </p>

        <div style={styles.aboutGrid}>
          <div style={styles.aboutCard}>
            <h4>Tech Stack</h4>
            <ul>
              <li>React.js</li>
              <li>Node.js & Express</li>
              <li>MongoDB</li>
              <li>JWT Authentication</li>
            </ul>
          </div>

          <div style={styles.aboutCard}>
            <h4>Why This System?</h4>
            <ul>
              <li>Fast and Secure</li>
              <li>Scalable Architecture</li>
              <li>Intuitive UI/UX</li>
              <li>Role-Based Authentication</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#121212", // Dark, sleek background for a modern feel
    color: "#fff",
    fontFamily: "'Poppins', sans-serif", // Clean and professional font
    overflowX: "hidden",
  },

  hero: {
    display: "flex",
    gap: 60,
    padding: "100px 120px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  heroLeft: { flex: 1, minWidth: 320 },
  heroRight: { flex: 1, textAlign: "center" },

  title: {
    fontSize: 56,
    fontWeight: 900,
    lineHeight: 1.2,
    marginBottom: 20,
    color: "#38bdf8", // Vibrant blue accent for the title
    letterSpacing: "2px",
  },

  subtitle: {
    fontSize: 20,
    lineHeight: 1.6,
    color: "#d1d5db", // Light gray text for contrast
    marginBottom: 30,
    fontWeight: "lighter",
    textShadow: "2px 2px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow for better visibility
  },

  btnGroup: { display: "flex", gap: 20 },

  primaryBtn: {
    padding: "18px 36px",
    background: "#38bdf8", // Bright blue accent
    border: "none",
    borderRadius: 35,
    fontWeight: 700,
    cursor: "pointer",
    color: "#121212",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    fontSize: "18px",
  },

  secondaryBtn: {
    padding: "18px 36px",
    background: "transparent",
    border: "2px solid #38bdf8",
    borderRadius: 35,
    fontWeight: 600,
    cursor: "pointer",
    color: "#38bdf8",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    fontSize: "18px",
  },

  heroImg: {
    width: "100%",
    maxWidth: 520,
    borderRadius: "12px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
  },

  section: {
    padding: "80px 120px",
  },

  sectionTitle: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 40,
    textAlign: "center",
    color: "#38bdf8", // Accent color for section titles
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 30,
  },

  card: {
    background: "rgba(255, 255, 255, 0.05)", // Slightly transparent background
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: 28,
    borderRadius: 12,
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
  },

  cardTitle: { fontSize: 22, marginBottom: 10, color: "#38bdf8" },
  cardDesc: { color: "#f1f5f9", lineHeight: 1.6 },

  about: {
    padding: "80px 120px",
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: 15,
  },

  aboutText: {
    maxWidth: 900,
    margin: "0 auto 40px",
    textAlign: "center",
    fontSize: 18,
    lineHeight: 1.8,
    color: "#d1d5db",
  },

  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 30,
    maxWidth: 900,
    margin: "auto",
  },

  aboutCard: {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    padding: 30,
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
};

/* ================= DATA ================= */

const features = [
  { title: "Student Registration", desc: "Effortless registration with secure user management." },
  { title: "Secure Login", desc: "Advanced JWT authentication for seamless access." },
  { title: "Admin Dashboard", desc: "Comprehensive management tools for admins." },
  { title: "Academic Records", desc: "Efficient management of student academic data." },
  { title: "MERN Stack", desc: "Built using MongoDB, Express, React, and Node.js for a scalable solution." },
  { title: "Scalable Design", desc: "Easily adaptable for future features and growth." },
];