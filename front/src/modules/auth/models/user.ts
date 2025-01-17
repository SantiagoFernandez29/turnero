import { Role } from "./role";

export interface User {
    id: number;
    name: string;
    email: string;
    areaId: number;
    terminalType: string;
    roles: Role[];
}