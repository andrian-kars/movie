import { getApiErrorMessage } from "@/api/config";
import { MoviesData, getMovies } from "@/api/moviesService";
import { createSlice } from "@reduxjs/toolkit";
import type { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  MoviesPageType,
  POPULAR,
  NOW_PLAYING,
  UPCOMING,
  TOP_RATED,
} from "@/constants";

interface MovieState {
  popular: MoviesData | null;
  "now-playing": MoviesData | null;
  upcoming: MoviesData | null;
  "top-rated": MoviesData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  popular: null,
  "now-playing": null,
  upcoming: null,
  "top-rated": null,
  isLoading: true,
  error: null,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPopular: (state, action: PayloadAction<MoviesData>) => {
      state.popular = action.payload;
      state.isLoading = false;
    },
    setNowPlaying: (state, action: PayloadAction<MoviesData>) => {
      state["now-playing"] = action.payload;
      state.isLoading = false;
    },
    setUpcoming: (state, action: PayloadAction<MoviesData>) => {
      state.upcoming = action.payload;
      state.isLoading = false;
    },
    setTopRated: (state, action: PayloadAction<MoviesData>) => {
      state["top-rated"] = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const fetchGetMovies =
  (type: MoviesPageType, page: number) => async (dispatch: Dispatch) => {
    try {
      dispatch(moviesSlice.actions.setLoading(true));
      const fetchedMovies = await getMovies(type, page);

      switch (type) {
        case POPULAR:
          dispatch(moviesSlice.actions.setPopular(fetchedMovies.data));
          break;
        case NOW_PLAYING:
          dispatch(moviesSlice.actions.setNowPlaying(fetchedMovies.data));
          break;
        case UPCOMING:
          dispatch(moviesSlice.actions.setUpcoming(fetchedMovies.data));
          break;
        case TOP_RATED:
          dispatch(moviesSlice.actions.setTopRated(fetchedMovies.data));
          break;
      }
    } catch (e) {
      const errorMessage = getApiErrorMessage(e);

      dispatch(moviesSlice.actions.setError(errorMessage));
    }
  };

export const {
  setPopular,
  setNowPlaying,
  setUpcoming,
  setTopRated,
  setLoading,
  setError,
} = moviesSlice.actions;

export default moviesSlice.reducer;
