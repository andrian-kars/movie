import { useEffectOnce } from "@/hooks";
import { fetchGetUpcoming } from "@/redux/MovieSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";

export const MoviePage = () => {
  const dispatch = useAppDispatch();

  const { upcoming, isLoading, error } = useSelector(
    (state: RootState) => state.movie
  );

  const getUpcoming = () => {
    dispatch(fetchGetUpcoming());
  };

  useEffectOnce(() => {
    !upcoming && getUpcoming();
  });

  console.log(upcoming, isLoading, error);

  return <div>movie</div>;
};
