import { RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import DefaultLayout from "../../shared/layout/DefaultLayout";
import { MonitorHomeView } from "./imports";
import ProtectedRoute from "../../shared/components/routes/protected-route";

export const monitorRoutes: RouteObject = {
  path: PATHS.MONITOR.HOME,
  element: (
    <ProtectedRoute>
      <DefaultLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "",
      element: <MonitorHomeView />,
    },
  ],
};
