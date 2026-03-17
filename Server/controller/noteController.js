import Note from "../models/Note.js";

export const addNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      subject: req.body.subject,
      file: req.file.filename
    });

    await note.save();
    res.json({ message: "Note uploaded successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};