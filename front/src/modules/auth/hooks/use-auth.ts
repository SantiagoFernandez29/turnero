import { useNavigate } from "react-router";
import { LoginCredentials } from "../models/login-credentials";
import { useAuthStore } from "../stores/auth-store";
import PATHS from "../../../configs/constants/paths";
import { User } from "../models/user";
import { useCreateToken } from "./use-create-token";


const useAuth = () => {

    const { setUser, setToken, user, token } = useAuthStore();
    const navigate = useNavigate();

    const login = (credentials: LoginCredentials) => {
        console.log("logueado con las credenciales: ", credentials)
        // mutation.mutate(credentials);
        navigate(PATHS.BACKOFFICE.HOME);
    }

    // reemplazar por el id del box que elige el usuario.
    // const id = "10";

    const onSuccess = (data: {token: string, user: User}) => {
        console.log(data)
        setUser(data.user);
        setToken(data.token);
        navigate(data.user.terminalType)
    }

    const onError = () => {
        console.log("Error al iniciar sesión.");
    }

    const mutation = useCreateToken(onSuccess, onError)
    
    const logout = () => {
        setUser(null);
        setToken(null);
        navigate(PATHS.GENERAL.LOGIN);
    }
    
    return {
        login,
        logout,
        user,
        token
    }
}

export default useAuth;