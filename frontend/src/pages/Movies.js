import { useEffect, useState } from "react";
import API from "../services/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let res;

        if (search.trim() === "") {
          res = await API.get("/movies");
        } else {
          res = await API.get(`/movies/search?query=${search}`);
        }

        setMovies(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [search]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎬 Movies</h1>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          display: "block",
        }}
      />

      {/* 🎬 Movie List */}
      {movies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        movies.map((movie) => (
          <div key={movie._id} style={{ marginBottom: "10px" }}>
            <h3>{movie.title}</h3>
            <a href={`/movie/${movie._id}`}>▶ Watch</a>
          </div>
        ))
      )}
    </div>
  );
};

export default Movies;
