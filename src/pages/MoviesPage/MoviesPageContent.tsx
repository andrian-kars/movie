import { MoviesData } from "@/api/moviesService";
import { Card, CardSkeleton } from "@/components";
import {
  INITIAL_PAGE,
  MoviesPageType,
  NOW_PLAYING,
  POPULAR,
  TOP_RATED,
  UPCOMING,
} from "@/constants";
import { Box, Pagination, Typography } from "@mui/material";
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

  // @ts-ignore
  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    getContent(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Typography variant="h4" pb={2}>
        {pageTitle}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
        {isLoading
          ? [...Array(20)].map((num, i) => <CardSkeleton key={`${num}-${i}`} />)
          : content?.results.map(
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
      <Pagination
        disabled={isLoading}
        sx={{ pt: 4, margin: "0 auto" }}
        size="large"
        count={
          content && content.total_pages > 500 ? 500 : content?.total_pages
        }
        page={content?.page || INITIAL_PAGE}
        onChange={handlePageChange}
      />
    </>
  );
};
