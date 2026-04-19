import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  thumbnail: String,
  videoUrl: String
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;