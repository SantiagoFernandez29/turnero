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
        mutation.mutate(credentials);
    }

    //cuando se loguea correctamente reseteo el formulario


    const onSuccess = (data: {token: string, user: User}) => {

        console.log(data)
        setUser(data.user);
        // setToken("bdf77d14e13b10286e45a00a233347d1f3da9c3dbf38b1322d404cb038ea");
        // setToken("f9a9f72c63445393bb96cecda8700ffbea5c3f30c79636fb3517fe555fa6");
        setToken("9c1ffa167b3006df0f392031992d1e71d09b6afb7df96c7bda6eadbbcd1c");
        navigate("monitor");
        // navigate(data.user.terminalType)
    }

    const onError = () => {
        console.log("Error al iniciar sesión.");
    }

    const mutation = useCreateToken(onSuccess, onError)
    
    const logout = () => {
        setUser(null);
        setToken(null);
        if (user?.terminalType === "box") localStorage.removeItem("box");
        navigate(PATHS.GENERAL.LOGIN);
    }
    
    return {
        login,
        logout,
        user,
        token,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
    }
}

export default useAuth;