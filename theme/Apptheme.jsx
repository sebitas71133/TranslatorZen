import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

export const Apptheme = ({ children }) => {
  let darkMode = useSelector((state) => state.translator.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#00bcd4" : "#1976d2",
      },
      secondary: {
        main: darkMode ? "#9c27b0" : "#ab47bc",
      },
      background: {
        default: darkMode ? "#121212" : "#f0f4f8",
        paper: darkMode ? "#1a1a2e" : "#e3f2fd",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#212121",
        secondary: darkMode ? "#80deea" : "#1e88e5",
      },
    },
    typography: {
      fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "uppercase",
            fontWeight: "bold",
            border: `2px solid ${darkMode ? "#00bcd4" : "#1976d2"}`,
            "&:hover": {
              backgroundColor: darkMode ? "#00bcd4" : "#1976d2",
              color: darkMode ? "#000000" : "#ffffff",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: darkMode ? "#00bcd4" : "#1976d2",
              },
              "&:hover fieldset": {
                borderColor: darkMode ? "#9c27b0" : "#ab47bc",
              },
              "&.Mui-focused fieldset": {
                borderColor: darkMode ? "#9c27b0" : "#ab47bc",
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1a1a2e" : "#e3f2fd",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1a1a2e" : "#e3f2fd",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
