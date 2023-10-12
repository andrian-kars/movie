import {
  MOVIES_NOW_PLAYING_PAGE_PATH,
  MOVIES_POPULAR_PAGE_PATH,
  MOVIES_TOP_RATED_PAGE_PATH,
  MOVIES_UPCOMING_PAGE_PATH,
  PERSON_PAGE_PATH,
  TV_AIRING_TODAY_PAGE_PATH,
  TV_ON_TV_PAGE_PATH,
  TV_POPULAR_PAGE_PATH,
  TV_TOP_RATED_PAGE_PATH,
} from "@/constants";

export const headerData = [
  {
    id: "movies",
    name: "Movies",
    menuItems: [
      { name: "Popular", path: MOVIES_POPULAR_PAGE_PATH },
      { name: "Now Playing", path: MOVIES_NOW_PLAYING_PAGE_PATH },
      { name: "Upcoming", path: MOVIES_UPCOMING_PAGE_PATH },
      { name: "Top Rated", path: MOVIES_TOP_RATED_PAGE_PATH },
    ],
  },
  {
    id: "tv-shows",
    name: "TV Shows",
    menuItems: [
      { name: "Popular", path: TV_POPULAR_PAGE_PATH },
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
