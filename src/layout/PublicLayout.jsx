import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { Navbar } from "../components/NavBar";
import { Box } from "@mui/material";

const PublicLayout = () => {
  const darkMode = useSelector((state) => state.translator.darkMode);
  //   const { session, loading } = useSelector((state) => state.session);

  //   if (loading) {
  //     return (
  //       <>
  //         <Loading />
  //       </>
  //     );
  //   }

  //   if (session) {
  //     return <Navigate to="/app/series" replace />;
  //   }

  return (
    <>
      <Navbar></Navbar>
      <Box
        component={"main"}
        sx={{
          p: 3,
          flexGrow: 1,
          mt: 10,
          backgroundImage: `${
            darkMode
              ? "url('/dark-cyberpunk.jpg')"
              : "url('/light-cyberpunk.jpg')"
          }`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Outlet></Outlet>
      </Box>
    </>
  );
};

export default PublicLayout;
