import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../hooks/use-auth";
import { LoginCredentials } from "../models/login-credentials";
import { useState } from "react";


const LoginView = () => {

    const { login } = useAuth();

    const [box, setBox] = useState('');

    const loginFormSchema = z.object({
        email: z.string().email({ message: "Invalid email" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
        box: z.string().nonempty({ message: "Box is required" }),
    });

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            box: "",
        }
    })

    const handleSubmit = (credentials: LoginCredentials) => {
        login(credentials);
        loginForm.reset();
    };


    return (
        // <Box>
        <form className="flex flex-col w-1/4 items-center gap-3 p-2" onSubmit={loginForm.handleSubmit(handleSubmit)}>
            <Controller
                name="email"
                control={loginForm.control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        error={!!loginForm.formState.errors.email}
                        helperText={loginForm.formState.errors.email?.message}
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
                        error={!!loginForm.formState.errors.email}
                        helperText={loginForm.formState.errors.email?.message}
                    />
                )}
            />
            <Controller
                name="box"
                control={loginForm.control}
                render={({ field }) => (
                    <Box>
                        <InputLabel id="demo-simple-select-disabled-label">Box</InputLabel>
                        <Select
                            {...field}
                            label="Box"
                            variant="outlined"
                            error={!!loginForm.formState.errors.email}
                            labelId="demo-simple-select-disabled-label"
                            id="demo-simple-select-disabled"
                            value={box}
                            fullWidth
                            onChange={(e) => setBox(e.target.value)}
                        >
                            <MenuItem value="1">Box 1</MenuItem>
                            <MenuItem value="2">Box 2</MenuItem>
                            <MenuItem value="3">Box 3</MenuItem>
                        </Select>
                    </Box>
                )}
            />
            <Button type="submit" variant="contained">Login</Button>
        </form>
        // </Box>
    )
}

export default LoginView;