import { RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import DefaultLayout from "../../shared/layout/DefaultLayout";
import { TotemHomeView } from "./imports";
import AreasSection from "../views/AreasSection";
import ProtectedRoute from "../../shared/components/routes/protected-route";

export const totemRoutes: RouteObject = {
  path: PATHS.TOTEM.HOME,
  element: (
    <ProtectedRoute>
      <DefaultLayout />
    </ProtectedRoute>
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
