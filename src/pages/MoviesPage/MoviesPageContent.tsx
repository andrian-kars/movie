import { MoviesData } from "@/api/moviesService";
import { Card } from "@/components";
import {
  INITIAL_PAGE,
  MoviesPageType,
  NOW_PLAYING,
  POPULAR,
  TOP_RATED,
  UPCOMING,
} from "@/constants";
import { Box, Typography } from "@mui/material";
import { FC, useEffect } from "react";

type MoviesPageContentProps = {
  currentPage: MoviesPageType;
  isLoading: boolean;
  content: null | MoviesData;
  getContent: (page: number) => void;
};

export const MoviesPageContent: FC<MoviesPageContentProps> = ({
  currentPage,
  isLoading,
  content,
  getContent,
}) => {
  let pageTitle = "";

  switch (currentPage) {
    case POPULAR:
      pageTitle = "Popular Movies";
      break;
    case NOW_PLAYING:
      pageTitle = "Now Playing Movies";
      break;
    case UPCOMING:
      pageTitle = "Upcoming Movies";
      break;
    case TOP_RATED:
      pageTitle = "Top Rated Movies";
      break;
  }

  useEffect(() => {
    !content && getContent(INITIAL_PAGE);
    document.title = pageTitle;
  }, [content]);

  console.log(content);

  return isLoading ? (
    <div>loading</div>
  ) : (
    <div>
      <Typography variant="h4">{pageTitle}</Typography>
      <Box display="flex" flexWrap="wrap" gap={3}>
        {content?.results.map(
          ({ title, poster_path, release_date, vote_average }) => (
            <Card
              key={title}
              poster={poster_path}
              title={title}
              date={release_date}
              vote={vote_average}
            />
          )
        )}
      </Box>
    </div>
  );
};
