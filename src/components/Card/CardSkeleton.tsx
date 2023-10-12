import { Skeleton } from "@mui/material";
import { memo } from "react";

export const CardSkeleton = memo(() => (
  <Skeleton width={200} height={400} variant="rectangular" />
));
