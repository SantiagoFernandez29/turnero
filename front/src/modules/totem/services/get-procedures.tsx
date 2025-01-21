import { Procedure } from "../models/procedure";

export const getProcedures = (areaId: number): Promise<Procedure[]> => {
    return fetch(`http://localhost:3000/system/procedures/${areaId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((response) => response.json())
        .then((data) => { return data });
}