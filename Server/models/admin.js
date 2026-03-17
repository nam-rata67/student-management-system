import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  course: String,
  year: String,
  role: { type: String, default: "admin" },
  avatar: String, // 👈 base64 image
});

export default mongoose.model("Admin", adminSchema);