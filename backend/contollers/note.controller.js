import Note from "../models/note.model.js";
import User from "../models/user.model.js";
export const createNote = async (req, res) => {
  const { title, content, createdOn, tags } = req.body;
  const newNote = new Note({
    title,
    content,
    createdOn,
    tags,
    userId:User._id,
  });
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
