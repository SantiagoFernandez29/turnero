import { Outlet } from "react-router";
import Footer from "./Footer";
import { ReactNode } from "react";
import { Box, Button } from "@mui/material";
import { LogOut } from "lucide-react";
import Header from "./Header";


interface DefaultLayoutProps {
    children?: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Box className="flex flex-col justify-end items-center h-svh">
      <Header />
      <Box className="flex flex-1 mt-3 p-0 container justify-center">
        {children ?? <Outlet />}
      </Box>
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
