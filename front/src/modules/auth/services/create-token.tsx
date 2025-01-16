import { LoginCredentials } from "../models/login-credentials";
import { User } from "../models/User";


export const createToken = (payload: LoginCredentials): Promise<{ token: string, user: User }> =>
    fetch("http://localhost:3000/auth2/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => { return data })