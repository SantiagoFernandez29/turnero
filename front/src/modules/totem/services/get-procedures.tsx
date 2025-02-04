import { Procedure } from "../models/procedure";

export const getProcedures = (token: string, areaId: number, logout: () => void): Promise<Procedure[]> => {
    return fetch(`${import.meta.env.VITE_API_BASE}/system/procedures/${areaId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                logout();
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then((data) => { return data });
}