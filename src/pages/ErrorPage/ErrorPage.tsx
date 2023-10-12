import {
  ERROR_CODE_400,
  ERROR_CODE_403,
  ERROR_CODE_404,
  ERROR_CODE_500,
  ERROR_CODE_502,
  ERROR_CODE_503,
  INITIAL_PAGE_PATH,
} from "@/constants";
import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

type ErrorPageProps = {
  errorCode?: number;
  additionalMessage?: string;
};

export const ErrorPage: FC<ErrorPageProps> = ({
  errorCode,
  additionalMessage,
}) => {
  let title, subTitle;

  switch (errorCode) {
    case ERROR_CODE_400:
      title = "Invalid request.";
      subTitle = "The server cannot process your request.";
      break;
    case ERROR_CODE_403:
      title = "Forbidden.";
      subTitle = "Access to the resource is restricted.";
      break;
    case ERROR_CODE_404:
      title = "This page was not found.";
      subTitle = "The requested page does not exist.";
      break;
    case ERROR_CODE_500:
      title = "Server error";
      subTitle = "There is a specific problem on the server.";
      break;
    case ERROR_CODE_502:
      title = "Gateway error.";
      subTitle = "An invalid response was received from another server.";
      break;
    case ERROR_CODE_503:
      title = "The service is unavailable.";
      subTitle = "The server is temporarily unable to process the request.";
      break;
    default:
      title = "Unknown error.";
      subTitle = "An unknown error occurred.";
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1.5}
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h3">{errorCode}</Typography>
      <Typography variant="h4">{title}</Typography>
      {additionalMessage && (
        <Typography variant="h4" fontStyle="italic" mb={2}>
          {additionalMessage}
        </Typography>
      )}
      <Typography variant="h5" fontStyle="italic" mb={2}>
        {subTitle}
      </Typography>
      <Button
        component={Link}
        to={INITIAL_PAGE_PATH}
        size="large"
        variant="outlined"
      >
        <Typography variant="h5" fontSize={16}>
          Go back to initial page
        </Typography>
      </Button>
    </Box>
  );
};
