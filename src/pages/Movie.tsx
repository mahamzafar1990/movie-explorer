import { useParams } from "react-router-dom";
import getMovieDetail from "../api/getMovieDetail";
import { useQuery } from "@tanstack/react-query";

const colors = [
  "bg-red-500 border-red-600",
  "bg-green-500 border-green-600",
  "bg-blue-500 border-blue-600",
  "bg-yellow-500 border-yellow-600",
  "bg-purple-500 border-purple-600",
];

export default function Movie() {
  const { id } = useParams<{ id: string }>() as { id: string };
  const { isLoading, data: movie } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetail(id),
    staleTime: 300,
  });
  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
            }}
            className="relative bg-cover bg-center w-full h-[40vh]"
          >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Content overlay */}
            <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4">
              <h1 className="text-4xl font-bold">{movie.title}</h1>
              <p className="mt-2 text-lg">
                ⭐ {movie.vote_average} •{" "}
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mt-6">
            <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg shadow-lg max-h-[500px] object-cover"
              />
            </div>
            <div className="flex-1 mt-6 px-4 md:px-0">
              {/* Overview */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Overview</h2>
                <p className="text-textSecondary leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              {/* Key Facts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="font-semibold">Release Date</p>
                  <p className="text-textSecondary">{movie.release_date}</p>
                </div>
                <div>
                  <p className="font-semibold">Runtime</p>
                  <p className="text-textSecondary">{movie.runtime} min</p>
                </div>
                <div>
                  <p className="font-semibold">Rating</p>
                  <p className="text-textSecondary">
                    {movie.vote_average} / 10
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Status</p>
                  <p className="text-textSecondary">{movie.status}</p>
                </div>
              </div>

              {/* Genres */}
              <div className="mb-6">
                <p className="font-semibold mb-2">Genres</p>
                <div className="inline-flex gap-2 flex-wrap">
                  {movie.genres.map((g, i) => (
                    <span
                      key={g.id}
                      className={`text-white px-3 py-1 rounded-full font-medium text-xs ${
                        colors[i % colors.length]
                      }`}
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Production Companies (optional) */}
              {movie.production_companies?.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Production</p>
                  <div className="flex gap-4 flex-wrap items-center">
                    {movie.production_companies.map((pc) => (
                      <div key={pc.id} className="flex items-center gap-2">
                        {pc.logo_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${pc.logo_path}`}
                            alt={pc.name}
                            className="h-6 object-contain"
                          />
                        )}
                        <span className="text-textSecondary text-sm">
                          {pc.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
