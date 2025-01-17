import { LoginCredentials } from "../models/login-credentials";
import { useMutation } from "@tanstack/react-query";
import { createToken } from "../services/create-token";
import { User } from "../models/user";


export const useCreateToken = (onSuccess: (data: { token: string; user: User }) => void, onError: () => void) => {
    const session = useMutation<{ token: string, user: User }, unknown, LoginCredentials>({
        mutationFn: (payload: LoginCredentials) => createToken(payload),
        onSuccess,
        onError,
    })

    return session;
}