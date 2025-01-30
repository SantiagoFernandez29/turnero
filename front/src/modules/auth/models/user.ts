import { Role } from "./role";

export interface User {
    id: number;
    username: string;
    email: string;
    areaId: number;
    roleId: number;
    terminalType: string;
    roles: Role[];
}