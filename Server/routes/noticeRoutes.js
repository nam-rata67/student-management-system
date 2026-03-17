import express from "express";
import {
  getAllNotices,
  addNotice,
  deleteNotice,
} from "../controller/noticeController.js";

const router = express.Router();

router.get("/", getAllNotices);       // student + admin
router.post("/", addNotice);          // admin
router.delete("/:id", deleteNotice);  // admin

export default router;