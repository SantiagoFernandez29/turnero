import { Outlet } from "react-router";
import Footer from "./Footer";
import { ReactNode } from "react";

interface DefaultLayoutProps {
    children?: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="flex flex-col justify-end items-center h-svh">
      <div className="flex flex-1 mt-3 p-0 container justify-center">
        {children ?? <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
