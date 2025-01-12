import { RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import PublicRoute from "../../shared/components/routes/public-route";
import DefaultLayout from "../../shared/layout/DefaultLayout";
import { BackofficeHomeView } from "./imports";

export const backofficeRoutes: RouteObject = {
    path: PATHS.BACKOFFICE.HOME,
    element: (
      <PublicRoute>
        <DefaultLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "",
        element: <BackofficeHomeView />,
      },
    ],
  };
  