import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/use-auth";
import { LoginCredentials } from "../models/login-credentials";

const LoginView = () => {
  const { login } = useAuth();

  const loginFormSchema = z.object({
    user: z.string().min(1, { message: "Invalid username" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const handleSubmit = (credentials: LoginCredentials) => {
    login(credentials);
    loginForm.reset();
  };

  return (
    <>
    <Box className="bg-violet-700 flex flex-row w-full">
        <Box className="flex flex-col items-center justify-center h-screen w-1/3 bg-violet-200">
            <form
            className="flex flex-col w-3/4 items-center gap-5 p-2"
            onSubmit={loginForm.handleSubmit(handleSubmit)}
            >
            <Controller
                name="user"
                control={loginForm.control}
                render={({ field }) => (
                <TextField
                    {...field}
                    label="Username"
                    variant="outlined"
                    error={!!loginForm.formState.errors.user}
                    helperText={loginForm.formState.errors.user?.message}
                    className="w-full"
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
                    className="w-full"
                />
                )}
            />
            <Button type="submit" variant="contained">
                Login
            </Button>
            </form>
        </Box>
        <Box className=" bg-gradient-to-t from-violet-800 to-violet-400 w-2/3">
            <img src="/assets/images/Municipalidad_de_Campana.jpg" alt="Login Image" className=" shadow-xl opacity-15 blur-sm" style={{ width: "1440px", height: "920px"}} />
        </Box>
    </Box>
    </>
  );
};

export default LoginView;
