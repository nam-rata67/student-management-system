import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Notice", noticeSchema);