import { useEffect, useState } from "react";
import API from "../services/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await API.get("/movies");
      setMovies(res.data);
    };

    fetchMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Movies</h1>

      {movies.map((movie) => (
        <div key={movie._id} style={{ marginBottom: "10px" }}>
          <h3>{movie.title}</h3>
          <a href={`/movie/${movie._id}`}>▶ Watch</a>
        </div>
      ))}
    </div>
  );
};

export default Movies;
