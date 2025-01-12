import { RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import DefaultLayout from "../../shared/layout/DefaultLayout";
import { TotemHomeView } from "./imports";
import PublicRoute from "../../shared/components/routes/public-route";
import AreasSection from "../views/AreasSection";

export const totemRoutes: RouteObject = {
  path: PATHS.TOTEM.HOME,
  element: (
    <PublicRoute>
      <DefaultLayout />
    </PublicRoute>
  ),
  children: [
    {
      path: "",
      element: <TotemHomeView />,
    },
    {
      path: PATHS.TOTEM.AREAS,
      element: <AreasSection />,
    }
  ],
};
