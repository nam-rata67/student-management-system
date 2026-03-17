import express from "express";
import {
 
  getAllUsers,
  approveUser,
  deleteUser,
  getAdminProfile,
  updateAdminProfile,
} from "../controller/adminController.js";

const router = express.Router();

// Admin profile routes (token-based)
router.get("/profile/:id", getAdminProfile);
router.put("/profile/:id", updateAdminProfile);

// Admin user management
router.get("/users", getAllUsers);
router.put("/approve/:id", approveUser);
router.delete("/delete/:id", deleteUser);



export default router;