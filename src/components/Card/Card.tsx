import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Card as MaterialCard,
  Typography,
} from "@mui/material";
import { FC, memo } from "react";
import { Link } from "react-router-dom";

type CardProps = {
  poster: string;
  title: string;
  date: string;
  vote: number;
};

export const Card: FC<CardProps> = memo(({ poster, title, date, vote }) => (
  <MaterialCard
    sx={{
      width: 200,
      p: 0,
      borderWidth: 1,
    }}
    variant="outlined"
  >
    <CardActionArea
      component={Link}
      to="/"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
    >
      <CardMedia
        component="img"
        width="200"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${poster}`}
        alt="green iguana"
      />
      <CardContent sx={{ p: 1, pt: 3, position: "relative" }}>
        <RatingIndicator vote={vote} />
        <Typography
          variant="h6"
          component="h4"
          fontSize={17}
          lineHeight={1.3}
          fontWeight={700}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(date).toLocaleString("en-CA", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>
      </CardContent>
    </CardActionArea>
  </MaterialCard>
));

type RatingIndicatorProps = {
  vote: number;
};

const RatingIndicator: FC<RatingIndicatorProps> = memo(({ vote }) => (
  <Box sx={{ position: "absolute", top: -20, display: "inline-flex" }}>
    <CircularProgress
      variant="determinate"
      size={35}
      thickness={3}
      value={vote * 10}
      sx={{ borderRadius: 50, color: "#32cd32", bgcolor: "black" }}
    />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography component="p" color="white" fontWeight={700} fontSize={15}>
        {vote * 10}
      </Typography>
    </Box>
  </Box>
));
