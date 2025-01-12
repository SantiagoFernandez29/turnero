import { RouteObject } from "react-router";
import { totemRoutes } from "./modules/totem/routes/totem.routes";
import { monitorRoutes } from "./modules/monitor/routes/monitor.routes";
import { backofficeRoutes } from "./modules/backoffice/routes/backoffice.routes";

export const routes: RouteObject[] = [
    totemRoutes,
    monitorRoutes,
    backofficeRoutes,
]