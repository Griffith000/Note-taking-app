import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./Routes/auth.routes.js";
import noteRouter from "./Routes/note.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();
dotenv.config();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend/note-app/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/note-app/dist", "index.html"));
})
app.use("/api/auth", router);
app.use("/api/note", noteRouter);
