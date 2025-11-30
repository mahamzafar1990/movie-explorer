import type { MoviesResponse } from "../types/movie";

export default async function fetchMovies(query:string = "", page:number = 1): Promise<MoviesResponse>
 {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const url = query.trim() && query.trim().length > 2 
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return {
        results: data.results,
        total_pages: data.total_pages,
        total_results: data.total_results,
        page: data.page
    };
}