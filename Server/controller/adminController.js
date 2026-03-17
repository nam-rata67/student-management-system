import User from "../models/User.js";
import bcrypt from "bcryptjs";

/// ✅ Get Admin Profile by ID
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

/// ✅ Update Admin Profile by ID
export const updateAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const { name, email, contact, password, course, year } = req.body;

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.contact = contact || admin.contact;
    admin.course = course || admin.course;
    admin.year = year || admin.year;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();
    res.json(admin);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
};

/// ✅ GET ALL STUDENTS
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/// ✅ APPROVE STUDENT
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

/// ✅ DELETE STUDENT
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

