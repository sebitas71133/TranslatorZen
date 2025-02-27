import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

export const Apptheme = ({ children }) => {
  let { darkMode } = useSelector((state) => state.translator);
  darkMode = !darkMode;

  const theme = createTheme({
    palette: {
      darkMode,
      primary: {
        main: darkMode === "dark" ? "#00ffff" : "#ff00ff",
      },
      secondary: {
        main: darkMode === "dark" ? "#ff00ff" : "#00ffff",
      },
      background: {
        default: darkMode === "dark" ? "#000000" : "#1a1a2e",
        paper: darkMode === "dark" ? "#0f0f1a" : "#16213e",
      },
      text: {
        primary: darkMode === "dark" ? "#00ffff" : "#ff00ff",
        secondary: darkMode === "dark" ? "#ff00ff" : "#00ffff",
      },
    },
    typography: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    // components: {
    //   MuiButton: {
    //     styleOverrides: {
    //       root: {
    //         borderRadius: 0,
    //         textTransform: "uppercase",
    //         fontWeight: "bold",
    //         border: `2px solid ${darkMode === "dark" ? "#00ffff" : "#ff00ff"}`,
    //         "&:hover": {
    //           backgroundColor: darkMode === "dark" ? "#00ffff" : "#ff00ff",
    //           color: darkMode === "dark" ? "#000000" : "#ffffff",
    //         },
    //       },
    //     },
    //   },
    //   MuiTextField: {
    //     styleOverrides: {
    //       root: {
    //         "& .MuiOutlinedInput-root": {
    //           "& fieldset": {
    //             borderColor: darkMode === "dark" ? "#00ffff" : "#ff00ff",
    //           },
    //           "&:hover fieldset": {
    //             borderColor: darkMode === "dark" ? "#ff00ff" : "#00ffff",
    //           },
    //           "&.Mui-focused fieldset": {
    //             borderColor: darkMode === "dark" ? "#ff00ff" : "#00ffff",
    //           },
    //         },
    //       },
    //     },
    //   },
    //   MuiAppBar: {
    //     styleOverrides: {
    //       root: {
    //         backgroundColor: darkMode === "dark" ? "#0f0f1a" : "#16213e",
    //       },
    //     },
    //   },
    //   MuiPaper: {
    //     styleOverrides: {
    //       root: {
    //         backgroundColor: darkMode === "dark" ? "#0f0f1a" : "#16213e",
    //       },
    //     },
    //   },
    // },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
