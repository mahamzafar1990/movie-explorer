export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

export type MoviesResponse = {
    results: Movie[];
    total_pages: number;
    total_results: number;
    page: number;
}