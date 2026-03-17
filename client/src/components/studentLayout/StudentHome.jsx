import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const quotesList = [
  "Don’t watch the clock; do what it does. Keep going.",
  "Success is the sum of small efforts repeated daily.",
  "Learning never exhausts the mind.",
  "Dream big. Work hard. Stay focused.",
  "Push yourself, because no one else is going to do it for you.",
  "The future depends on what you do today.",
  "Believe you can and you're halfway there."
];

const facts = [
  "🧠 Studying 25 minutes with breaks improves focus.",
  "📖 Writing notes by hand helps memory.",
  "💡 Teaching others helps you learn better.",
  "☀ Morning study improves long-term memory.",
  "🎯 Set clear goals to stay motivated."
];

const StudentHome = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const studentName = user?.name || "Student";

  const [quote, setQuote] = useState("");
  const [typedQuote, setTypedQuote] = useState("");
  const [factIndex, setFactIndex] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [streak, setStreak] = useState(1);

  const today = new Date().toDateString();

  // Greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  // Random quote
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotesList.length);
    setQuote(quotesList[randomIndex]);
  }, []);

  // Typing animation
  useEffect(() => {
    let i = 0;
    setTypedQuote("");
    const interval = setInterval(() => {
      setTypedQuote((prev) => prev + quote.charAt(i));
      i++;
      if (i >= quote.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [quote]);

  // Auto change fact
  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Announcement from Admin
  useEffect(() => {
    const msg = localStorage.getItem("announcementMessage");
    if (msg) setAnnouncement(msg);
  }, []);

  // Login streak
  useEffect(() => {
    const lastDate = localStorage.getItem("lastLoginDate");
    if (lastDate !== today) {
      const oldStreak = Number(localStorage.getItem("streak") || 0);
      const newStreak = oldStreak + 1;
      localStorage.setItem("streak", newStreak);
      localStorage.setItem("lastLoginDate", today);
      setStreak(newStreak);
    } else {
      setStreak(Number(localStorage.getItem("streak") || 1));
    }
  }, []);

  return (
    <div style={styles.container}>

      {/* ANNOUNCEMENT */}
      {announcement && showAnnouncement && (
        <motion.div style={styles.announcement}>
          📢 {announcement}
          <button
            onClick={() => setShowAnnouncement(false)}
            style={styles.closeBtn}
          >
            ✖
          </button>
        </motion.div>
      )}

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={styles.hero}
      >
        <h1>👋 {greeting}, {studentName}!</h1>
        <p>📅 Today: {today}</p>
        <p>🔥 Login Streak: {streak} days</p>
      </motion.div>

      {/* QUOTE */}
      <motion.div style={styles.quote}>
        💬 {typedQuote}
      </motion.div>

      {/* FACT */}
      <motion.div
        key={factIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.fact}
      >
        {facts[factIndex]}
      </motion.div>

      {/* DAILY GOAL */}
      <motion.div style={styles.goalBox}>
        🎯 <strong>Today's Goal:</strong>  
        <br />
        Study at least 1 hour and revise yesterday's topic.
      </motion.div>

      {/* HAPPY MESSAGE */}
      <motion.div style={styles.happyBox}>
        💖 You are doing amazing!  
        <br />
        🌈 Learn something new every day and keep smiling 😄
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(135deg,#f0f4f8,#e0e7ff)",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', sans-serif",
  },
  announcement: {
    background: "#fde68a",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px",
    position: "relative",
    fontWeight: "600",
  },
  closeBtn: {
    position: "absolute",
    right: 10,
    top: 5,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
  },
  hero: {
    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
    color: "#fff",
    padding: "30px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  quote: {
    marginTop: "25px",
    background: "#f1f5f9",
    padding: "18px",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "500",
  },
  fact: {
    marginTop: "18px",
    background: "#ecfeff",
    padding: "16px",
    borderRadius: "12px",
    textAlign: "center",
    color: "#0369a1",
    fontWeight: "500",
  },
  goalBox: {
    marginTop: "25px",
    background: "#dcfce7",
    padding: "18px",
    borderRadius: "14px",
    textAlign: "center",
    fontWeight: "600",
  },
  happyBox: {
    marginTop: "30px",
    background: "#fef3c7",
    padding: "22px",
    borderRadius: "16px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "16px",
  },
};

export default StudentHome;