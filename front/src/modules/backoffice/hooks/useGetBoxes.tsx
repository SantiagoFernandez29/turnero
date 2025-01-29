import { useQuery } from "@tanstack/react-query";
import { BoxType } from "../models/box";
import { getBoxes } from "../services/get-boxes";

const GET_BOXES = 'GET_BOXES';

export const useGetBoxes = (areaId: number, token: string) => {
    const boxes = useQuery<BoxType[]>({
        queryKey: [GET_BOXES, areaId, token],
        queryFn: () => getBoxes(areaId, token),
    })

    return {
        boxes: boxes.data,
    };
};