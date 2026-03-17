import Notice from "../models/Notice.js";

// 📌 Get all notices (Admin + Student)
export const getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notices", error });
  }
};

// 📌 Add new notice (Admin only)
export const addNotice = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Notice text is required" });
    }

    const notice = new Notice({ text });
    await notice.save();

    res.status(201).json({ message: "Notice added successfully", notice });
  } catch (error) {
    res.status(500).json({ message: "Failed to add notice", error });
  }
};

// 📌 Delete notice (Admin only)
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    await Notice.findByIdAndDelete(id);

    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notice", error });
  }
};