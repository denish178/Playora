import Movie from "../models/Movie.js";
import mongoose from "mongoose";
import { exec } from "child_process";
import fs from "fs";

// ADD MOVIE
export const addMovie = async (req, res) => {
  try {
    const { title, description, thumbnail, videoUrl } = req.body;

    const movie = await Movie.create({
      title,
      description,
      thumbnail,
      videoUrl,
    });

    res.status(201).json({
      message: "Movie added",
      movie,
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

export const uploadMovie = async (req, res) => {
  try {
    const { title, description } = req.body;
    const filePath = req.file.path;

    const outputDir = `uploads/hls-${Date.now()}`;
    fs.mkdirSync(outputDir);

    const command = `ffmpeg -i "${filePath}" -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ${outputDir}/index.m3u8`;

    exec(command, async (error) => {
      if (error) {
        return res.status(500).json({ error: "FFmpeg failed" });
      }

      const movie = await Movie.create({
        title,
        description,
        videoUrl: `http://localhost:5000/${outputDir}/index.m3u8`,
      });

      res.json({
        message: "Upload success",
        movie,
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
