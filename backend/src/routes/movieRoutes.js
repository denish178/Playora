import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";
import { uploadMovie } from "../controllers/movieController.js";
import { deleteMovie } from "../controllers/movieController.js";
import { searchMovies } from "../controllers/movieController.js";
import {
  addMovie,
  getMovies,
  getMovieById,
} from "../controllers/movieController.js";

const router = express.Router();

// protected (only logged-in users)
router.post("/", authMiddleware, addMovie);

// public
router.get("/", getMovies);
router.get("/search", searchMovies);
router.get("/:id", getMovieById);
router.post("/upload", authMiddleware, upload.single("video"), uploadMovie);
router.delete("/:id", deleteMovie);

export default router;
