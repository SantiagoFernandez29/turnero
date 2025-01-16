import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/use-auth";
import { LoginCredentials } from "../models/login-credentials";


const LoginView = () => {

    const { login } = useAuth();

    const loginFormSchema = z.object({
        user: z.string().min(1, { message: "Invalid username" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    });

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            user: "",
            password: "",
        }
    })

    const handleSubmit = (credentials: LoginCredentials) => {
        login(credentials);
        loginForm.reset();
    };


    return (
        <form className="flex flex-col w-1/4 items-center gap-3 p-2" onSubmit={loginForm.handleSubmit(handleSubmit)}>
            <Controller
                name="user"
                control={loginForm.control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        error={!!loginForm.formState.errors.user}
                        helperText={loginForm.formState.errors.user?.message}
                    />
                )}
            />
            <Controller
                name="password"
                control={loginForm.control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Password"
                        variant="outlined"
                        type="password"
                        error={!!loginForm.formState.errors.password}
                        helperText={loginForm.formState.errors.password?.message}
                    />
                )}
            />
            <Button type="submit" variant="contained">Login</Button>
        </form>
    )
}

export default LoginView;