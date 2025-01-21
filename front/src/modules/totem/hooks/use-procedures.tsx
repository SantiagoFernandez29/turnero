import { useQuery } from "@tanstack/react-query"
import { getProcedures } from "../services/get-procedures"
import { Procedure } from "../models/procedure"

export const GET_PROCEDURES = "GET_PROCEDURES"

export const useProcedures = (areaId: number) => {
    const procedures = useQuery<Procedure[]>({
        queryKey: [GET_PROCEDURES, areaId],
        queryFn: () => getProcedures(areaId),
    })

    return procedures
}