import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// ===================== EMAIL HELPER =====================
const sendEmail = async ({ to, subject, html }) => {
  if (!to) throw new Error("No recipient specified for email");

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = { from: process.env.EMAIL, to, subject, html };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return reject(err);
      resolve(info);
    });
  });
};

// ===================== REGISTER USER =====================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, contact, course, year, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      contact,
      course,
      year,
      role: role || "user",
      status: role === "admin" ? "approved" : "pending",
    });

    await user.save();
    res.json({ message: "Registered successfully ✅", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//login user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // 🔴 Google login account check (MISSING in your code)
    if (!user.password) {
      return res.status(400).json({
        message: "This account was created using Google. Please login with Google."
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    // status check (both admin & user)
    if (user.status !== "approved") {
      return res.status(403).json({ message: "Admin approval required" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
// ===================== ADMIN FUNCTIONS =====================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ===================== FORGOT PASSWORD =====================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
    user.password = await bcrypt.hash(tempPassword, 10);
    await user.save();

    const html = `<p>Hello ${user.name},</p>
      <p>Your temporary password: <strong>${tempPassword}</strong></p>
      <p>Use it to login and change your password immediately.</p>`;

    await sendEmail({ to: user.email, subject: "Password Reset", html });

    res.json({ message: "Temporary password sent to your email ✅" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password ❌", error: err.message });
  }
};

// ===================== CHANGE PASSWORD =====================
export const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: "Current and new passwords required" });

    let user;

    if (email) {
      user = await User.findOne({ email });
    } else {
      const auth = req.headers?.authorization;
      if (!auth?.startsWith("Bearer "))
        return res.status(401).json({ message: "Authorization required" });

      const token = auth.split(" ")[1];

      // ✅ FIXED SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id);
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Current password incorrect ❌" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password ❌", error: err.message });
  }
};

// ===================== GET STUDENT PROFILE =====================
export const getStudentProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ===================== UPDATE PROFILE =====================
export const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};