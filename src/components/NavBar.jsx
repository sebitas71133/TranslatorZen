import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import GitHubIcon from "@mui/icons-material/GitHub";
import { CardMedia, FormControlLabel, Switch } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { setDarkMode } from "../store/slices/translatorSlice";

const pages = [
  { label: "TRANSLATOR", path: "/" },
  { label: "ANSWER", path: "answer" },
  // { label: "Catalogo", path: "catalogo" },
  // { label: "Niños y Familia", path: "niñosfamilia" },
];

// const settings = [
//   { id: "profile", label: "Profile" },
//   { id: "account", label: "Account" },
//   { id: "dashboard", label: "Dashboard" },
//   { id: "logout", label: "Logout" },
// ];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.translator.darkMode);
  // const handleLogout = useLogout();
  // const { email, loading, user } = useSelector((state) => state.session);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenuOption = async (id) => {
    setAnchorElUser(null);

    if (id === "logout") {
      handleLogout();
    }

    if (id === "profile") {
      navigate("/app/profile");
    }
  };

  const handleNavigate = (path) => {
    //  console.log(path);

    navigate(path);
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* OPCIONES NAVBAR OCULTO */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="text.primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none", height: "400px" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleNavigate(page.path)}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "'Poppins', sans-serif", // Consistencia en la tipografía
                      fontWeight: 700, // Mantener el peso
                      fontFamily: "monospace",
                      letterSpacing: ".3rem",
                      color: "text.primary", // Color hereda del botón
                      ml: 2,
                      textDecoration: "none",
                      "&:hover": {
                        backgroundColor: darkMode ? "#4A90E2" : "#355C7D",
                        color: "#FFFFFF",
                      },
                    }}
                  >
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              display: "flex",

              gap: 2,
              mb: { xs: 2, sm: 0 },
            }}
          >
            <CardMedia
              component="img"
              image={"/me.jpg"}
              alt={"zen"}
              sx={{
                maxWidth: 35,
                borderRadius: 2,
                display: { xs: "none", md: "block" },
              }}
            />
            <Button
              sx={{ p: 0, border: "none", mt: { xs: 2, sm: 0 } }}
              onClick={() =>
                window.open("https://github.com/sebitas71133", "_blank")
              }
            >
              <GitHubIcon
                fontSize="large"
                sx={{
                  color: "text.primary",
                  display: { sm: "block" },
                }}
              />
            </Button>
          </Box>
          {/* Logo en pantallas grandes */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to={""}
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              // fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "text.primary",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            ZEBAS
          </Typography>

          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={""}
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 4,
              display: { xs: "flex", md: "none" },
              flexGrow: 0,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "text.primary",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            ZEBAS
          </Typography>

          {/* OPCIONES NAVBAR */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {pages.map((page) => (
              <Typography
                key={page.label}
                variant="h5"
                sx={{
                  fontWeight: 700, // Mantener el peso
                  fontFamily: "monospace",
                  letterSpacing: ".3rem",
                  color: "text.primary", // Color hereda del botón
                  ml: 4,
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: darkMode ? "#4A90E2" : "#355C7D",
                    color: "#FFFFFF",
                  },
                }}
                component={Link}
                to={page.path}
              >
                {page.label}
              </Typography>
            ))}
          </Box>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => dispatch(setDarkMode(!darkMode))}
                  icon={<Brightness7Icon />}
                  checkedIcon={<Brightness4Icon />}
                />
              }
              // label={darkMode ? "Modo Oscuro" : "Modo Claro"}
            />
          </Box>

          {/* Nombre de usuario */}

          {/* <Typography
            variant="h6"
            noWrap
            component="h5"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flexGrow: 0,
              fontFamily: "'Poppins', sans-serif", // Tipografía moderna
              fontWeight: 600, // Peso de la fuente para que sea más visible
              fontSize: { xs: "1rem", md: "1.25rem" }, // Tamaño adaptable según pantalla
              letterSpacing: ".05rem", // Espaciado ligero para mayor legibilidad
              color: "white", // Color verde para un toque fresco
              textDecoration: "none",
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Fondo sutil
              padding: "8px 16px", // Padding para que se vea más espacioso
              borderRadius: "8px", // Bordes redondeados para un look moderno
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra sutil para mayor profundidad
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.15)", // Cambia el fondo al pasar el mouse
                cursor: "pointer", // Cursor tipo mano para interactividad
              },
            }}
          >
            {email}
          </Typography> */}

          {/* Icono Usuario Logueado */}
          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user.identities[0].identity_data.avatar_url}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.id}
                  value={setting.id}
                  onClick={(event) => handleCloseUserMenuOption(setting.id)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
