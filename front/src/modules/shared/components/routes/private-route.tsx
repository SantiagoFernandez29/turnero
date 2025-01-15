import React from "react";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {

    const hasPermission = true;

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
