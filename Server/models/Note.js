import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  file: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Note", noteSchema);