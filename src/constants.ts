export const INITIAL_PAGE = 1;

// pages
export const POPULAR = "popular";
export const NOW_PLAYING = "now-playing";
export const UPCOMING = "upcoming";
export const TOP_RATED = "top-rated";

export type MoviesPageType =
  | typeof POPULAR
  | typeof NOW_PLAYING
  | typeof UPCOMING
  | typeof TOP_RATED;

// Paths
export const INITIAL_PAGE_PATH = "/";

export const MOVIES_PAGE_PATH = "/movies";
export const MOVIES_POPULAR_PAGE_PATH = "/movies/popular";
export const MOVIES_NOW_PLAYING_PAGE_PATH = "/movies/now-playing";
export const MOVIES_UPCOMING_PAGE_PATH = "/movies/upcoming";
export const MOVIES_TOP_RATED_PAGE_PATH = "/movies/top-rated";

export const TV_PAGE_PATH = "/tv";
export const TV_POPULAR_PAGE_PATH = "/tv/popular";
export const TV_AIRING_TODAY_PAGE_PATH = "/tv/airing-today";
export const TV_ON_TV_PAGE_PATH = "/tv/on-tv";
export const TV_TOP_RATED_PAGE_PATH = "/tv/top-rated";

export const PERSON_PAGE_PATH = "/people";
