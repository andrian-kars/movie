import { Route, Routes } from "react-router-dom";
import {
  ERROR_CODE_404,
  INITIAL_PAGE_PATH,
  MOVIES_PAGE_PATH,
  TV_PAGE_PATH,
} from "@/constants";
import { ErrorPage, InitialPage, MoviesPage, TvPage } from "@/pages";
import { Header, Main } from "@/layouts";

export const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path={INITIAL_PAGE_PATH} element={<InitialPage />} />
          <Route path={`${MOVIES_PAGE_PATH}/:page`} element={<MoviesPage />} />
          <Route path={`${TV_PAGE_PATH}/:page`} element={<TvPage />} />

          <Route path="*" element={<ErrorPage errorCode={ERROR_CODE_404} />} />
        </Routes>
      </Main>
    </>
  );
};
