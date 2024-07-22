import express from "express";
import {
  createNote,
  editNote,
  getNotes,
  deleteNote,
  pinNote,
  searchNotes
} from "../contollers/note.controller.js";
import { authenticateToken } from "../middleware/auth.token.js";
const noteRouter = express.Router();
noteRouter.get("/get-notes", authenticateToken, getNotes);
noteRouter.post("/add-note", authenticateToken, createNote);
noteRouter.put("/edit-note/:id", authenticateToken, editNote);
noteRouter.delete("/delete-note/:id", authenticateToken, deleteNote);
noteRouter.get("/search-notes", authenticateToken, searchNotes);
noteRouter.put("/pin-note/:id", authenticateToken, pinNote);

export default noteRouter;
