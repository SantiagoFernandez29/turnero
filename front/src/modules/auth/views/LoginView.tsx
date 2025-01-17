import {
  Box,
  Button,
  TextField,
  Typography,
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
        <Box className="flex flex-col items-center justify-between h-screen w-1/3 p-2 pb-4 bg-violet-200">
          <Box className="w-full">
            <img src="/assets/images/municipalidad_de_campana_logo.jpeg" alt="Logo" className="rounded-sm w-1/6 max-h-5 object-cover" />
          </Box>
          <Box className="flex flex-col items-center gap-5">
            <Typography variant="h3" style={{ fontWeight: "lighter", fontFamily: "inherit" }}>Turnero Municipal</Typography>
          </Box>
          <form
            className="flex flex-col w-3/4 items-center gap-5"
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
                  color="secondary"
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
                  color="secondary"
                  type="password"
                  error={!!loginForm.formState.errors.password}
                  helperText={loginForm.formState.errors.password?.message}
                  className="w-full"
                />
              )}
            />
            <Button type="submit" variant="contained" className="w-1/2" color="secondary" style={{ fontWeight: "lighter", fontFamily: "inherit" }}>
              Login
            </Button>
          </form>
        </Box>
        <Box className=" bg-gradient-to-t from-violet-800 to-violet-400 w-2/3">
          <img src="/assets/images/Municipalidad_de_Campana.jpg" alt="Login Image" className=" shadow-xl opacity-15 blur-sm h-screen" style={{ width: "1440px"}} />
        </Box>
      </Box>
    </>
  );
};

export default LoginView;
