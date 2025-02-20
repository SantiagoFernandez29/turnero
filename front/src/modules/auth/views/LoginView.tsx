import {
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/use-auth";
import { LoginCredentials } from "../models/login-credentials";
import LoadingButton from "../../shared/components/ui/loading-button";

const LoginView = () => {
  const { login, isLoading, isSuccess } = useAuth();

  const loginFormSchema = z.object({
    username: z.string().min(1, { message: "Nombre de usuario inválido." }),
    password: z
      .string()
      .min(6, { message: "Contraseña inválida." }),
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "sfernandez",
      password: "Master@2022",
    },
  });

  const handleSubmit = (credentials: LoginCredentials) => {
    login(credentials);
    if (isSuccess) loginForm.reset();
  };

  return (
    <>
      <Box className="bg-violet-700 flex flex-row w-full">
        <Box className="flex flex-col items-center justify-between h-screen w-1/3 p-2 pb-4 bg-violet-200">
          <Box className="w-full">
            <img src="/assets/images/municipalidad_de_campana_logo.jpg" alt="Logo" className="rounded-sm w-1/6 max-h-7 object-cover" />
          </Box>
          <Box className="flex flex-col items-center gap-5">
            <Typography variant="h3" style={{ fontWeight: "lighter", fontFamily: "inherit" }}>Turnero Municipal</Typography>
          </Box>
          <form
            className="flex flex-col w-3/4 items-center gap-5"
            onSubmit={loginForm.handleSubmit(handleSubmit)}
          >
            <Controller
              name="username"
              control={loginForm.control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  variant="outlined"
                  color="secondary"
                  error={!!loginForm.formState.errors.username}
                  helperText={loginForm.formState.errors.username?.message}
                  className="w-full"
                  disabled={isLoading}
                  sx={{ input: { fontFamily: "Quicksand" }, label: { fontFamily: "Quicksand" } }}
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
                  disabled={isLoading}
                  sx={{ input: { fontFamily: "Quicksand" }, label: { fontFamily: "Quicksand" } }}
                />
              )}
            />
            <LoadingButton type="submit" variant="contained" className="w-1/2" color="secondary" style={{ fontWeight: "lighter", fontFamily: "inherit" }} isLoading={isLoading}>
              Login
            </LoadingButton>

          </form>
        </Box>
        <Box className=" bg-gradient-to-t from-violet-800 to-violet-400 w-2/3">
          <img src="/assets/images/Municipalidad_de_Campana.jpg" alt="Login Image" className=" shadow-xl opacity-15 blur-sm h-screen" style={{ width: "1440px" }} />
        </Box>
      </Box>
    </>
  );
};

export default LoginView;
