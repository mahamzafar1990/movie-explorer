import { use } from "react";
import type { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/movie/${movie.id}`);
  }
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-[300px] cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      {/* Image */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-[200px] object-cover"
      />

      {/* Card content */}
      <div className="p-2 flex-1">
        <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
        <span
          className="text-gray-600 text-sm mt-1 line-clamp-2"
          title={movie.overview}
        >
          {movie.overview}
        </span>
      </div>
    </div>
  );
}
