import { lazy } from "react";
import { Loader } from "../../shared/layout/Loader";


export const LoginView = Loader(lazy(() => import("../views/LoginView")));