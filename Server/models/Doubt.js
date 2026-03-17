import mongoose from "mongoose";

const doubtSchema = new mongoose.Schema({
  studentName: String,
  subject: String,
  doubt: String,
  studentFile: String,

  adminReply: String,
  adminFile: String,

  feedbackEmoji: String, // 🔥 😍 😐 😡

  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Doubt", doubtSchema);