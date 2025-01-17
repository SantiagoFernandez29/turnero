import React from "react";
import useAuth from "../../../auth/hooks/use-auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const { user, token } = useAuth();

    const hasPermission = user !== null && token !== null;

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
