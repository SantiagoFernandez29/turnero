import { RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import DefaultLayout from "../../shared/layout/DefaultLayout";
import { BackofficeHomeView } from "./imports";
import PrivateRoute from "../../shared/components/routes/private-route";

export const backofficeRoutes: RouteObject = {
    path: PATHS.BACKOFFICE.HOME,
    element: (
      <PrivateRoute>
        <DefaultLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <BackofficeHomeView />,
      },
    ],
  };
  