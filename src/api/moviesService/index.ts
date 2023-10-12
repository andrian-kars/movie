import { moviesApi } from "@/api/config";
import { INITIAL_PAGE, MoviesPageType } from "@/constants";

export interface MoviesData {
  page: number;
  results: Array<{
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>;
  total_pages: number;
  total_results: number;
}

export const getMovies = (type: MoviesPageType, page: number = INITIAL_PAGE) =>
  moviesApi.get(`movie/${type.split("-").join("_")}`, {
    params: {
      page,
    },
  });
