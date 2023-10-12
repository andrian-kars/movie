import { fetchGetMovies } from "@/redux/MoviesSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MoviesPageContent } from "./MoviesPageContent";
import {
  MoviesPageType,
  NOW_PLAYING,
  POPULAR,
  TOP_RATED,
  UPCOMING,
} from "@/constants";
import { ErrorPage } from "..";

const ARR_OF_PAGES = [POPULAR, NOW_PLAYING, UPCOMING, TOP_RATED];

export const MoviesPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const state = useSelector((state: RootState) => state.movies);
  const { isLoading, error } = state;

  if (!params.page || !ARR_OF_PAGES.includes(params.page) || error) {
    return <ErrorPage additionalMessage={error || "Wrong page path"} />;
  }

  const currentPage = params.page as MoviesPageType;
  const content = state[currentPage];

  const getContent = (page: number) => {
    dispatch(fetchGetMovies(currentPage, page));
  };

  return (
    <MoviesPageContent
      currentPage={currentPage}
      isLoading={isLoading}
      content={content}
      getContent={getContent}
    />
  );
};
