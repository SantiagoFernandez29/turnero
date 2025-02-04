import { BoxType } from "../models/box";


export const getBoxes = (areaId: number, token: string, logout: () => void): Promise<BoxType[]> => {
    return fetch(`${import.meta.env.VITE_API_BASE}/system/availableBoxes/${areaId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }).then((response) => {
        if (!response.ok) {
            logout();
            throw new Error(`Failed to fetch boxes`);
        }
        return response.json();
    })
}