import { TvData } from "@/api/tvService";
import { Card, CardSkeleton } from "@/components";
import {
  INITIAL_PAGE,
  TvPageType,
  AIRING_TODAY,
  POPULAR,
  TOP_RATED,
  ON_TV,
} from "@/constants";
import { Box, Pagination, Typography } from "@mui/material";
import { FC, useEffect } from "react";

type TvPageContentProps = {
  currentPage: TvPageType;
  isLoading: boolean;
  content: null | TvData;
  getContent: (page: number) => void;
};

export const TvPageContent: FC<TvPageContentProps> = ({
  currentPage,
  isLoading,
  content,
  getContent,
}) => {
  let pageTitle = "";

  switch (currentPage) {
    case POPULAR:
      pageTitle = "Popular TV Shows";
      break;
    case AIRING_TODAY:
      pageTitle = "TV Shows Airing Today";
      break;
    case ON_TV:
      pageTitle = "Currently On TV Shows";
      break;
    case TOP_RATED:
      pageTitle = "Top Rated TV Shows";
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
              ({ name, poster_path, first_air_date, vote_average }) => (
                <Card
                  key={name}
                  poster={poster_path}
                  title={name}
                  date={first_air_date}
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
