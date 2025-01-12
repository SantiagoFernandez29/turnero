import { RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import PublicRoute from "../../shared/components/routes/public-route";
import DefaultLayout from "../../shared/layout/DefaultLayout";
import { MonitorHomeView } from "./imports";

export const monitorRoutes: RouteObject = {
  path: PATHS.MONITOR.HOME,
  element: (
    <PublicRoute>
      <DefaultLayout />
    </PublicRoute>
  ),
  children: [
    {
      path: "",
      element: <MonitorHomeView />,
    },
  ],
};
