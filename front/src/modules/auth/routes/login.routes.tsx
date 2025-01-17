import { Outlet, RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import { LoginView } from "./imports";

export const loginRoutes: RouteObject = {
  path: PATHS.GENERAL.LOGIN,
  element: <Outlet />,
  children: [
    {
      path: "",
      element: <LoginView />,
    },
  ],
};
