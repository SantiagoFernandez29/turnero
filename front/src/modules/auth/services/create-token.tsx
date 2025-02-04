import { LoginCredentials } from "../models/login-credentials";
import { User } from "../models/user";


export const createToken = (payload: LoginCredentials): Promise<{ token: string, user: User }> =>
    fetch(`${import.meta.env.VITE_API_BASE}/auth2/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => { return data })