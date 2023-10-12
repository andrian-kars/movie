import { Route, Routes } from "react-router-dom";
import { INITIAL_PAGE_PATH, MOVIE_PAGE_PATH } from "@/constants";
import { InitialPage, MoviePage } from "@/pages";
import { Header } from "@/layouts";

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={INITIAL_PAGE_PATH} element={<InitialPage />} />
        <Route path={MOVIE_PAGE_PATH} element={<MoviePage />} />

        <Route path="*" element={<InitialPage />} />
      </Routes>
    </>
  );
};
