import { useQuery } from "@tanstack/react-query"
import { getProcedures } from "../services/get-procedures"
import { Procedure } from "../models/procedure"

export const GET_PROCEDURES = "GET_PROCEDURES"

export const useProcedures = (token: string, areaId: number) => {
    const procedures = useQuery<Procedure[]>({
        queryKey: [GET_PROCEDURES, areaId, token],
        queryFn: () => getProcedures(token, areaId),
    })

    return procedures
}