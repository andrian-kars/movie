import {
  MOVIE_NOW_PLAYING_PAGE_PATH,
  MOVIE_PAGE_PATH,
  MOVIE_TOP_RATED_PAGE_PATH,
  MOVIE_UPCOMING_PAGE_PATH,
  PERSON_PAGE_PATH,
  TV_AIRING_TODAY_PAGE_PATH,
  TV_ON_TV_PAGE_PATH,
  TV_PAGE_PATH,
  TV_TOP_RATED_PAGE_PATH,
} from "@/constants";

export const headerData = [
  {
    id: "movies",
    name: "Movies",
    menuItems: [
      { name: "Popular", path: MOVIE_PAGE_PATH },
      { name: "Now Playing", path: MOVIE_NOW_PLAYING_PAGE_PATH },
      { name: "Upcoming", path: MOVIE_UPCOMING_PAGE_PATH },
      { name: "Top Rated", path: MOVIE_TOP_RATED_PAGE_PATH },
    ],
  },
  {
    id: "tv-shows",
    name: "TV Shows",
    menuItems: [
      { name: "Popular", path: TV_PAGE_PATH },
      { name: "Airing Today", path: TV_AIRING_TODAY_PAGE_PATH },
      { name: "On TV", path: TV_ON_TV_PAGE_PATH },
      { name: "Top Rated", path: TV_TOP_RATED_PAGE_PATH },
    ],
  },
  {
    id: "people",
    name: "People",
    menuItems: [{ name: "Popular People", path: PERSON_PAGE_PATH }],
  },
];
