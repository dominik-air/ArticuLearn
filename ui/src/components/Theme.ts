import React from "react";
import { useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";
import green from "@mui/material/colors/green";
import grey from "@mui/material/colors/grey";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[700],
      contrastText: grey[50],
    },
    secondary: {
      main: green[500],
      contrastText: grey[900],
    },
    background: {
      default: grey[50],
      paper: grey[200],
    },
    text: {
      primary: grey[900],
      secondary: grey[700],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[800],
      contrastText: grey[200],
    },
    secondary: {
      main: green[600],
      contrastText: grey[300],
    },
    background: {
      default: grey[900],
      paper: grey[800],
    },
    text: {
      primary: grey[50],
      secondary: grey[300],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: "none",
    },
  },
});

const useCustomTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return React.useMemo(
    () => createTheme(prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode],
  );
};

export default useCustomTheme;
