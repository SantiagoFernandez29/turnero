import { useNavigate } from "react-router";
import { LoginCredentials } from "../models/login-credentials";
import { useAuthStore } from "../stores/auth-store";
import PATHS from "../../../configs/constants/paths";
import { User } from "../models/User";


const useAuth = () => {

    const { setUser, setToken } = useAuthStore();
    const navigate = useNavigate();

    const login = (credentials: LoginCredentials) => {
        console.log("logueado con las credenciales: ", credentials)
        // login mutate logic
        // mutation.mutate(credentials);
    }

    // reemplazar por el id del box que elige el usuario.
    const id = "10";

    const onSuccess = (data: {token: string, user: User}) => {
        setUser(data.user);
        setToken(data.token);
        navigate(`${PATHS.BACKOFFICE.HOME.replace(':id', id)}`)
    }

    const onError = () => {
        console.log("Error al iniciar sesión.");
    }

    // const mutation = useCreateToken(onSuccess, onError)
    
    const logout = () => {
        setUser(null);
        setToken(null);
        navigate(PATHS.BACKOFFICE.LOGIN);
    }
    
    return {
        login,
        logout
    }
}

export default useAuth;