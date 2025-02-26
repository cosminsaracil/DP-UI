"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Any changes in the theme can be done by overriding the theme object here.

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

//   light: "#757ce8",
//   main: "#3f50b5",
//   dark: "#002884",

//   light: "#ff7961",
//   main: "#f44336",
//   dark: "#ba000d",

// primary: {
//   light: "#475569",
//   main: "#1e293b",
//   dark: "#0f172a",
//   contrastText: "#fff",
// },
// secondary: {
//   light: "#ff7961",
//   main: "#f44336",
//   dark: "#ba000d",
//   contrastText: "#000",
// },
