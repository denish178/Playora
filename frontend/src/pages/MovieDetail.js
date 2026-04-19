import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Player from "./Player";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await API.get(`/movies/${id}`);
      console.log("VIDEO URL:", res.data.videoUrl); // 👈 IMPORTANT
      setMovie(res.data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie.title}</h2>
      <Player url={movie.videoUrl} />
    </div>
  );
};

export default MovieDetail;
