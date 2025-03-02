import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import "@fontsource/orbitron"; // Asegura la fuente Cyberpunk

export const Apptheme = ({ children }) => {
  let darkMode = useSelector((state) => state.translator.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#00F0FF" : "#007ACC", // Cian neón en oscuro, azul intenso en claro
      },
      secondary: {
        main: darkMode ? "#FF0077" : "#FF477E", // Rojo neón en oscuro, rosa eléctrico en claro
      },
      background: {
        default: darkMode ? "#030712" : "#E5E5E5", // Azul casi negro en oscuro, gris claro en claro
        paper: darkMode ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.85)", // Semi-transparente
      },
      text: {
        primary: darkMode ? "#00F0FF" : "#1A1A1A", // Cian en oscuro, gris oscuro en claro
        secondary: darkMode ? "#FF0077" : "#444444", // Rojo en oscuro, gris medio en claro
      },
    },
    typography: {
      fontFamily:
        '"Orbitron", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode
              ? "rgba(15, 23, 42, 0.8)"
              : "rgba(255, 255, 255, 0.85)", // Vidrio esmerilado
            border: darkMode ? "2px solid #00F0FF" : "1px solid #007ACC",
            boxShadow: darkMode
              ? "0px 0px 20px #00F0FF"
              : "0px 0px 10px #007ACC",
            backdropFilter: "blur(15px)", // ✨ Efecto de vidrio futurista
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: "uppercase",
            fontWeight: "600",
            border: `2px solid ${darkMode ? "#FF0077" : "#007ACC"}`,
            color: darkMode ? "#00F0FF" : "#FFFFFF",
            background: darkMode
              ? "linear-gradient(90deg, #00F0FF, #FF0077)"
              : "linear-gradient(90deg, #007ACC, #FF477E)",
            transition: "0.3s ease-in-out",
            "&:hover": {
              background: darkMode
                ? "linear-gradient(90deg, #FF0077, #00F0FF)"
                : "linear-gradient(90deg, #FF477E, #007ACC)",
              transform: "scale(1.05)", // Efecto de luz al pasar el mouse
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: darkMode ? "#00F0FF" : "#007ACC",
              },
              "&:hover fieldset": {
                borderColor: darkMode ? "#FF0077" : "#FF477E",
              },
              "&.Mui-focused fieldset": {
                borderColor: darkMode ? "#FF0077" : "#FF477E",
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#030712" : "#FFFFFF",
            boxShadow: darkMode ? "0px 0px 15px #00F0FF" : "none",
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
