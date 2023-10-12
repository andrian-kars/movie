import { Route, Routes } from "react-router-dom";
import { INITIAL_PAGE_PATH, MOVIES_PAGE_PATH } from "@/constants";
import { InitialPage, MoviesPage } from "@/pages";
import { Header, Main } from "@/layouts";

export const App = () => {
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path={INITIAL_PAGE_PATH} element={<InitialPage />} />
          <Route path={`${MOVIES_PAGE_PATH}/:page`} element={<MoviesPage />} />

          <Route path="*" element={<InitialPage />} />
        </Routes>
      </Main>
    </>
  );
};
