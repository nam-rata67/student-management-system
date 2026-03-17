import express from "express";
import multer from "multer";
import { addNote, getNotes, deleteNote } from "../controller/noteController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/add", upload.single("file"), addNote);
router.get("/", getNotes);
router.delete("/:id", deleteNote);

export default router;