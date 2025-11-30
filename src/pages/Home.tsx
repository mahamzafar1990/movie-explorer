import MovieCard from "../components/MovieCard";

import { useQuery } from "@tanstack/react-query";
import fetchMovies from "../api/fetchMovies";
import type { Movie } from "../types/movie";
import { useState } from "react";
import Searchbar from "../components/Searchbar";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { isLoading, data: moviesData } = useQuery({
    queryKey: ["movies", page, search],
    queryFn: () => fetchMovies(search, page),
    staleTime: 300,
  });

  const movies = moviesData?.results || [];
  const totalPages = moviesData?.total_pages || 1;

  return (
    <div className="w-full items-center min-h-screen flex flex-col bg-background px-6 py-6">
      <div className="flex w-full items-center justify-center mb-2">
        <Searchbar search={search} setSearch={setSearch} />
      </div>
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin text-secondary w-10 h-10" />
        </div>
      ) : !movies || movies?.length === 0 ? (
        <div>No movies found.</div>
      ) : (
        <div className="flex-1 w-full overflow-y-auto max-h-[70vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies?.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 justify-center mt-4">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-secondary text-white rounded-lg shadow hover:bg-secondary/80 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <span className="font-medium text-primary">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-secondary text-white rounded-lg shadow hover:bg-secondary/80 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
