import Movie from "../models/Movie.js";
import mongoose from "mongoose";

// ADD MOVIE
export const addMovie = async (req, res) => {
  try {
    const { title, description, thumbnail, videoUrl } = req.body;

    const movie = await Movie.create({
      title,
      description,
      thumbnail,
      videoUrl
    });

    res.status(201).json({
      message: "Movie added",
      movie
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL MOVIES
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE MOVIE
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const movie = await Movie.findById(id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};