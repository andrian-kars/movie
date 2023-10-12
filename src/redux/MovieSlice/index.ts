import { getApiErrorMessage } from "@/api/config";
import { UpcomingMovieData, getUpcomingMovie } from "@/api/movieService";
import { createSlice } from "@reduxjs/toolkit";
import type { Dispatch, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  upcoming: UpcomingMovieData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  upcoming: null,
  isLoading: true,
  error: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setUpcoming: (state, action: PayloadAction<UpcomingMovieData>) => {
      state.upcoming = action.payload;
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

export const fetchGetUpcoming = () => async (dispatch: Dispatch) => {
  try {
    dispatch(movieSlice.actions.setLoading(true));
    const fetchedUpcoming = await getUpcomingMovie();

    dispatch(movieSlice.actions.setUpcoming(fetchedUpcoming.data));
  } catch (e) {
    const errorMessage = getApiErrorMessage(e);

    dispatch(movieSlice.actions.setError(errorMessage));
  }
};

export const { setUpcoming } = movieSlice.actions;

export default movieSlice.reducer;
