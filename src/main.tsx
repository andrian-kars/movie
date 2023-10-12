import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(3, 37, 65)",
    },
    secondary: {
      main: "#fff",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <CssBaseline />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </Router>
);
