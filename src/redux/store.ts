import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./MoviesSlice";
import { useDispatch } from "react-redux";
import TvSlice from "./TvSlice";

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    tv: TvSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
