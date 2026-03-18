import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔹 Google login start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 🔹 Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    try {
      // ✅ JWT token create
      const token = jwt.sign(
        {
          id: req.user._id,
          email: req.user.email,
          role: req.user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // 🔥 IMPORTANT LINE (FRONTEND REDIRECT)
      res.redirect(
        `https://student-management-system-sslt.onrender.com/auth-success?token=${token}`
      );

    } catch (error) {
      console.error(error);
      res.redirect("https://student-management-system-sslt.onrender.com/login");
    }
  }
);

export default router;
