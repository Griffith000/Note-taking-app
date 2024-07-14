import Note from "../models/note.model.js";
import User from "../models/user.model.js";
export const createNote = async (req, res) => {
  const { title, content, createdOn, tags,userId } = req.body;
  const newNote = new Note({
    title,
    content,
    createdOn,
    tags,
    userId,
  });
  try {
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editNote = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  if (!id)
    return res.status(404).send(`No note with id: ${id}`);
  const updatedNote = { title, content, tags, _id: id };
  await Note.findByIdAndUpdate(id, updatedNote, { new: true });
  res.json(updatedNote);
}

export const getNotes = async (req, res) => {
  const { userId } = req.body;
  const notes = await Note.find({ userId });
  res.json(notes);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(404).send(`No note with id: ${id}`);
  await Note.findByIdAndDelete(id);
  res.json({ message: "Note deleted successfully" });
}
export const pinNote = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(404).send(`No note with id: ${id}`);
  const updatedNote = await Note.findByIdAndUpdate(id, { isPinned: !Note.isPinned }, { new: true });
  res.json(updatedNote);
}
