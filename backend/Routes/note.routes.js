import express from "express";
import { createNote } from "../contollers/note.controller.js";
import { authenticateToken } from "../middleware/auth.token.js";
const noteRouter = express.Router();
noteRouter.post("/add-note", createNote);

export default noteRouter;
