import { lazy } from "react";
import { Loader } from "../../shared/layout/Loader";


export const TotemHomeView = Loader(lazy(() => import('../views/TotemHomeView')))