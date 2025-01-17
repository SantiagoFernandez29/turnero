import { RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import DefaultLayout from "../../shared/layout/DefaultLayout";
import { BackofficeHomeView } from "./imports";
import ProtectedRoute from "../../shared/components/routes/protected-route";

export const backofficeRoutes: RouteObject = {
    path: PATHS.BACKOFFICE.HOME,
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <BackofficeHomeView />,
      },
    ],
  };
  