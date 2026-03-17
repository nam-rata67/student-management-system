import mongoose from "mongoose";

const studentRecordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  presentDays: Number,
  absentDays: Number,
  totalDays: Number,
  totalFee: Number,
  paidFee: Number
});

export default mongoose.model("StudentRecord", studentRecordSchema);