import { fetchGetTv } from "@/redux/TvSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TvPageContent } from "./TvPageContent";
import {
  TvPageType,
  AIRING_TODAY,
  POPULAR,
  TOP_RATED,
  ON_TV,
} from "@/constants";
import { ErrorPage } from "..";

const ARR_OF_PAGES = [POPULAR, AIRING_TODAY, ON_TV, TOP_RATED];

export const TvPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const state = useSelector((state: RootState) => state.tv);
  const { isLoading, error } = state;

  if (!params.page || !ARR_OF_PAGES.includes(params.page) || error) {
    return <ErrorPage additionalMessage={error || "Wrong page path"} />;
  }

  const currentPage = params.page as TvPageType;
  const content = state[currentPage];

  const getContent = (page: number) => {
    dispatch(fetchGetTv(currentPage, page));
  };

  return (
    <TvPageContent
      currentPage={currentPage}
      isLoading={isLoading}
      content={content}
      getContent={getContent}
    />
  );
};
