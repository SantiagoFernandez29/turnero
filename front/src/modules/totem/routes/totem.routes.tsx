import { RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import DefaultLayout from "../../shared/layout/DefaultLayout";
import ProtectedRoute from "../../shared/components/routes/protected-route";
import { TotemHomeView } from "./imports";

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
  ],
};
