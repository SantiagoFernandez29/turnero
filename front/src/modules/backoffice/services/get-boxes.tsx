import { BoxType } from "../models/box";


export const getBoxes = (areaId: number, token: string): Promise<BoxType[]> => {
    return fetch(`http://localhost:3000/system/box/${areaId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to fetch boxes`);
        }
        return response.json();
    })
}