import AreaButton from "../components/AreaButton";
import { Box, Button, TextField, Typography } from "@mui/material";
import useTotem from "../hooks/use-totem";
import React, { useState } from "react";
import { useProcedures } from "../hooks/use-procedures";
import useAuth from "../../auth/hooks/use-auth";

const TotemHomeView = () => {

    const { user, token, logout } = useAuth();
    const { data: tramites } = useProcedures(token ? token : "", user ? user.areaId : -1, logout);
    const { handleClickedArea, setShowHomeView, showHomeView, area, isLoading } = useTotem();

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [document, setDocument] = useState("");

    const handleClick = (number: number) => {
        setDocument((prev) => prev + number);
    }

    const handleDelete = () => {
        setDocument((prev) => prev.slice(0, -1));
    }

    return (
        <React.Fragment>
            <Box className={`${showHomeView ? "flex" : "hidden"}`}>
                <Box className="flex flex-col justify-evenly gap-4  ">
                    <Box>
                        <Typography variant="h1" style={{ fontWeight: "lighter", textAlign: "center", fontFamily: "inherit", fontSize: "4em" }}> ¡Bienvenido al Turnero Municipal! </Typography>
                        <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "center", fontFamily: "inherit", fontSize: "3em", color: "indigo" }}> {area} </Typography>
                        <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center", fontFamily: "inherit", fontSize: "2em" }}> Por favor, ingrese su número de DNI para solicitar un turno según el trámite. </Typography>
                    </Box>
                    <Box className="flex flex-col gap-5 items-center">
                        <Box className="grid grid-cols-3 gap-2 w-1/2 bg-slate-200 p-2 rounded-lg shadow-lg">
                            {numbers.map((number) => (
                                <Button key={number} variant="contained" color="secondary" size="small" style={{ fontSize: "2em", fontWeight: "bold", fontFamily: "inherit" }} onClick={() => handleClick(number)}>{number}</Button>
                            ))}
                            <Button variant="contained" color="secondary" size="small" className="col-start-2" style={{ fontSize: "2em", fontWeight: "bold", fontFamily: "inherit" }} onClick={() => handleClick(0)}>0</Button>
                        </Box>
                        <Box className="flex flex-row gap-5">
                            <TextField variant="standard" placeholder="Documento" color="secondary" value={document} fullWidth sx={{ input: { fontSize: "1.75em", fontFamily: "Quicksand" } }} slotProps={{ input: { endAdornment:

                            <Button variant="contained" color="error" size="large" style={{ fontSize: "1.5em", fontWeight: "bold", padding: "2p" }} onClick={() => handleDelete()}>Borrar</Button> 
                             }}}/>
                        </Box>
                    </Box>
                    <Box className="flex items-center justify-center">
                        <Button variant="contained" color="secondary" size="large" className="w-3/4" style={{ fontSize: "1.25em", fontWeight: "bold" }} onClick={() => setShowHomeView(false)}>
                            Solicitar turno
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box className={`${showHomeView ? "hidden" : "flex"}`}>
                <Box className="flex flex-col items-center gap-10 place-content-between m-5">
                    <Typography variant="h4" style={{ fontWeight: "lighter", fontFamily: "inherit", textAlign: "center" }}> Seleccione el trámite sobre el cual desea solicitar un turno. </Typography>
                    <Box className="grid grid-cols-2 gap-4 w-full">
                        {tramites && tramites.map((tramite) => (
                            <AreaButton key={tramite.id} title={tramite.name} style={{ fontSize: "1.65em", fontFamily: "inherit" }} onClick={() => handleClickedArea(tramite)} isLoading={isLoading} />
                        ))}
                    </Box>
                    <Button variant="contained" color="error" size="large" style={{ fontFamily: "inherit", fontWeight: "bold", fontSize: "2em" }} className="w-1/2" onClick={() => setShowHomeView(true)}>
                        Volver
                    </Button>
                </Box>
            </Box>
        </React.Fragment>

    )
}

export default TotemHomeView;