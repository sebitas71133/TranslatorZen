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
        main: darkMode ? "#4A90E2" : "#355C7D", // Azul eléctrico en oscuro, azul oscuro en claro
      },
      secondary: {
        main: darkMode ? "#D32F2F" : "#F67280", // Rojo oscuro en oscuro, rosa en claro
      },
      background: {
        default: darkMode ? "#121212" : "#F5F5F5", // Fondo negro-gris en oscuro, gris claro en claro
        paper: darkMode ? "#1E1E1E" : "#FFFFFF", // Fondo de contenedores en oscuro y blanco en claro
      },
      text: {
        primary: darkMode ? "#FFFFFF" : "#333333", // Blanco puro en oscuro, gris oscuro en claro
        secondary: darkMode ? "#B0B0B0" : "#666666", // Gris claro en oscuro, gris medio en claro
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
            boxShadow: "none", // Elimina cualquier sombra blanca
            borderRadius: 8, // Bordes más suaves
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
            boxShadow: "none", // Quita la sombra blanca
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            textTransform: "none",
            fontWeight: "500",
            border: `1px solid ${darkMode ? "#4A90E2" : "#355C7D"}`,
            "&:hover": {
              backgroundColor: darkMode ? "#4A90E2" : "#355C7D",
              color: "#FFFFFF",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: darkMode ? "#4A90E2" : "#355C7D",
              },
              "&:hover fieldset": {
                borderColor: darkMode ? "#D32F2F" : "#F67280",
              },
              "&.Mui-focused fieldset": {
                borderColor: darkMode ? "#D32F2F" : "#F67280",
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1E1E1E" : "#FFFFFF",
            boxShadow: "none",
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
