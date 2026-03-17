
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  
  googleId: String,
  avatar: String,
  contact: String,
  course: String,
  year: String,
  role: { type: String, default: "user" },
  status: { type: String, default: "pending" }
});

export default mongoose.model("User", userSchema);