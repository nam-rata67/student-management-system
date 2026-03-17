import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  approveUser,
  deleteUser,
  
  forgotPassword,
  changePassword,
  getStudentProfile,
  updateUserProfile,
  
} from "../controller/UserController.js";

const router = express.Router();

// -------------------- PUBLIC ROUTES --------------------
// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Forgot & Change password
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword);

// -------------------- ADMIN ROUTES --------------------
// Get all users
router.get("/", getAllUsers);

// Approve a user (admin action)
router.put("/approve/:id", approveUser);

// Delete a user (admin action)
router.delete("/:id", deleteUser);


router.get("/profile/:id", getStudentProfile);

router.put("/profile/:id", updateUserProfile);



export default router;