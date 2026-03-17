import express from "express";
import { addStudentRecord, getStudentByEmail } from "../controller/studentRecordController.js";

const router = express.Router();

// POST - add or update
router.post("/add", addStudentRecord);

// GET by email
router.get("/email/:email", getStudentByEmail);

export default router;