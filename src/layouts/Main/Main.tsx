import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export const Main: FC<MainProps> = ({ children }) => (
  <Box
    component="main"
    padding={5}
    display="flex"
    flexDirection="column"
    alignSelf="center"
  >
    {children}
  </Box>
);
