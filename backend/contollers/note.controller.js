import Note from "../models/note.model.js";
import User from "../models/user.model.js";
export const createNote = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(403).json({ message: "Authentication required" });
  }
  const { title, content, tags } = req.body; // Changed from req.body to req.query for GET request
  const newNote = new Note({
    title,
    content,
    tags,
    userId, // Use the userId obtained from req.user?.id
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
  if (!id) return res.status(404).send(`No note with id: ${id}`);
  const updatedNote = { title, content, tags, _id: id };
  await Note.findByIdAndUpdate(id, updatedNote, { new: true });
  res.json(updatedNote);
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user?.id; // Changed from req.body to req.query for GET request
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const notes = await Note.find({ userId });
    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found for this user" });
    }
    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the notes",
      error: error.message,
    });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).send(`No note with id: ${id}`);
  await Note.findByIdAndDelete(id);
  res.json({ message: "Note deleted successfully" });
};
export const pinNote = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).send(`No note with id: ${id}`);
  try{
  const updatedNote = await Note.findByIdAndUpdate(
    id,
    { isPinned: !Note.isPinned },
    { new: true }
  );
  res.json({updatedNote , message: "Note pinned successfully" });
  }catch(error){
    res.status(500).json({ message: "Error pinning note", error: error.message });
  }   
};

export const searchNotes = async (req, res) => {
  const user = req.user;
  const { query } = req.query;
  if (!user) return res.status(400).json({ message: "User is required" });
  if (!query) return res.status(400).json({ message: "Query is required" });
  try {
    const notes = await Note.find({
      userId: user.id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });
    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }
    res.status(200).json({ message: "Notes found", notes });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error searching for notes", error: err.message });
  }
};
