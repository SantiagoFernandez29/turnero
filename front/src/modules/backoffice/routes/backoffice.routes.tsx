import { RouteObject } from "react-router";
import PATHS from "../../../configs/constants/paths";
import DefaultLayout from "../../shared/layout/DefaultLayout";
import { BackofficeHomeView, SetBoxView } from "./imports";
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
        element: <SetBoxView />,
      },
      {
        path: PATHS.BACKOFFICE.HOME + PATHS.BACKOFFICE.BOX,
        element: <BackofficeHomeView />,
      },
    ],
  };
  