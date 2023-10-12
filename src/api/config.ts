import axios, { AxiosError } from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTc1NGU1ZGEzY2U4OGRlM2JiOTc2NThhMDFjZGUzNCIsInN1YiI6IjY1MjcxNmI5NmRlYTNhMDEwMDFjZDIwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f7r-kG4OraocI1nmWtXfh6UHSlWf6b2P3RCxLeAbJxY";

export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
});

export const getApiErrorMessage = (e: unknown) => {
  const error = e as Error | AxiosError;

  return error.message;
};
