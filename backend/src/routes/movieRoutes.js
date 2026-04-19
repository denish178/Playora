import express from "express";
import {
  addMovie,
  getMovies,
  getMovieById
} from "../controllers/movieController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// protected (only logged-in users)
router.post("/", authMiddleware, addMovie);

// public
router.get("/", getMovies);
router.get("/:id", getMovieById);

export default router;