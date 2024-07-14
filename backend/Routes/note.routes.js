import express from "express";
import { createNote,editNote,getNotes,deleteNote,pinNote } from "../contollers/note.controller.js";
import { authenticateToken } from "../middleware/auth.token.js";
const noteRouter = express.Router();
noteRouter.post("/add-note",authenticateToken, createNote);
noteRouter.post("/edit-note/:id",authenticateToken,editNote);
noteRouter.get("/get-notes",authenticateToken, getNotes);
noteRouter.delete("/delete-note/:id", deleteNote);
noteRouter.put("/pin-note/:id",authenticateToken, pinNote);


export default noteRouter;
