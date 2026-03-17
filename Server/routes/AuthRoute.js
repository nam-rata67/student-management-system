import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Google login start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          role: req.user.role, // ✅ MUST
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.redirect(
        `${process.env.CLIENT_URL}/auth-success?token=${token}`
      );
    } catch (err) {
      console.error(err);
      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  }
);

// get logged-in user
router.get("/me", isAuthenticated, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;