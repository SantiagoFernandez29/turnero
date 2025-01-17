import React from "react";
import useAuth from "../../../auth/hooks/use-auth";
import { useLocation } from "react-router";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const { user, token } = useAuth();
    const { pathname } = useLocation();

    // const user = {
    //     id: 1,
    //     name: "Santiago Fernández",
    //     email: "santifer2914@gmmail.com",
    //     areaId: 1,
    //     terminalType: "box",
    //     roles: [
    //         {
    //             id: 1,
    //             name: "Admin",
    //             permissions: [
    //                 {
    //                     scope: "areas"
    //                 },
    //                 {
    //                     scope: "box"
    //                 }
    //             ]
    //         }
    //     ]
    // }

    const [_, terminal, scope] = pathname.split('/');
        
    const validTerminal = user?.terminalType === terminal || user?.terminalType === "*";
    const validScope = user?.roles.some((role) => role.permissions.some((permission) => permission.scope === scope || permission.scope === "*"));
    const hasPermission = user?.terminalType === "box" ? validTerminal && token : scope ? validTerminal && validScope && token : validTerminal && token;


    if (!hasPermission) {
        return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-rose-600 text-7xl font-extrabold">403 Forbidden</h1>
                <p>Sorry, you are not authorized to access this page.</p>
            </div>
        </React.Fragment>
        )
    } else {
        return children;
    }
}
