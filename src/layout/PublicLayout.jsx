import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";
import { Navbar } from "../components/NavBar";
import { Box } from "@mui/material";

const PublicLayout = () => {
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
  console.log("go");

  return (
    <>
      <Navbar></Navbar>
      <Box component={"main"} sx={{ p: 3, flexGrow: 1, mt: 10 }}>
        <Outlet></Outlet>
      </Box>
    </>
  );
};

export default PublicLayout;
