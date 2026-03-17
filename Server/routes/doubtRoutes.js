import express from "express";
import Doubt from "../models/Doubt.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* STUDENT submit doubt */
router.post("/", upload.single("studentFile"), async (req, res) => {
  const { studentName, subject, doubt } = req.body;

  const newDoubt = new Doubt({
    studentName,
    subject,
    doubt,
    studentFile: req.file?.filename || ""
  });

  await newDoubt.save();
  res.json({ message: "Doubt saved" });
});

/* GET all doubts */
router.get("/all", async (req, res) => {
  const doubts = await Doubt.find().sort({ createdAt: -1 });
  res.json(doubts);
});

/* ADMIN reply */
router.post("/reply/:id", upload.single("adminFile"), async (req, res) => {
  const doubt = await Doubt.findById(req.params.id);

  if (doubt.status === "Answered") {
    return res.status(400).json({ message: "Already answered" });
  }

  doubt.adminReply = req.body.adminReply;
  doubt.adminFile = req.file?.filename || "";
  doubt.status = "Answered";

  await doubt.save();
  res.json({ message: "Reply saved" });
});

/* STUDENT emoji feedback */
router.post("/feedback/:id", async (req, res) => {
  const { emoji } = req.body;

  const doubt = await Doubt.findById(req.params.id);
  doubt.feedbackEmoji = emoji;
  await doubt.save();

  res.json({ message: "Feedback saved" });
});

/* DELETE doubt (admin) */
router.delete("/:id", async (req, res) => {
  await Doubt.findByIdAndDelete(req.params.id);
  res.json({ message: "Doubt deleted" });
});

export default router;