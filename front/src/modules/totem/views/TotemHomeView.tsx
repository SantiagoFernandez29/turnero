import AreaButton from "../components/AreaButton";
import { Box, Button, TextField, Typography } from "@mui/material";
import useTotem from "../hooks/use-totem";
import React, { useState } from "react";
import { useProcedures } from "../hooks/use-procedures";
import useAuth from "../../auth/hooks/use-auth";

const TotemHomeView = () => {

    const { user, token } = useAuth();
    const { data: tramites } = useProcedures(token ? token : "", user ? user.areaId : -1);
    const { handleClickedArea, setShowHomeView, showHomeView, area, isLoading } = useTotem();

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [document, setDocument] = useState("");

    const handleClick = (number: number) => {
        setDocument((prev) => prev + number);
    }

    return (
        <React.Fragment>
            <Box className={`${showHomeView ? "flex" : "hidden"}`}>
                <Box className={`flex flex-col justify-evenly items-center}`}>
                    <Box>
                        <Typography variant="h1" style={{ fontWeight: "lighter", textAlign: "center", fontFamily: "inherit" }}> ¡Bienvenido al Turnero Municipal! </Typography>
                        <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "center", fontFamily: "inherit", color: "indigo" }}> {area} </Typography>
                        <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center", fontFamily: "inherit" }}> Por favor, ingrese su número de DNI para solicitar un turno según el trámite. </Typography>
                    </Box>
                    <Box className="flex flex-col gap-5">
                        <Box className="grid grid-cols-5 gap-2 bg-slate-300 p-2 rounded-lg shadow-lg">
                            {numbers.map((number) => (
                                <Button key={number} variant="outlined" color="secondary" size="large" style={{ fontSize: "2em", fontWeight: "bold" }} onClick={() => handleClick(number)}>{number}</Button>
                            ))}
                        </Box>
                        <Box className="flex flex-row gap-5">
                            <TextField placeholder="Documento" color="secondary" value={document} fullWidth sx={{ input: { fontSize: "3em" } }} ></TextField>
                            <Button variant="contained" color="error" size="large" style={{ fontSize: "2em", fontWeight: "bold" }} onClick={() => setDocument("")}>Borrar</Button>
                        </Box>
                    </Box>
                    <Button variant="contained" color="secondary" size="large" style={{ fontSize: "4em", fontWeight: "bold" }} onClick={() => setShowHomeView(false)}>
                        Solicitar turno
                    </Button>
                </Box>
            </Box>
            <Box className={`${showHomeView ? "hidden" : "flex"}`}>
                <Box className="flex flex-col items-center gap-10 place-content-between m-5">
                    <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center" }}> Seleccione el trámite sobre el cual desea solicitar un turno. </Typography>
                    <Box className="grid grid-cols-2 gap-4 w-full">
                        {tramites && tramites.map((tramite) => (
                            <AreaButton key={tramite.id} title={tramite.name} onClick={() => handleClickedArea(tramite)} isLoading={isLoading} />
                        ))}
                    </Box>
                    <Button variant="contained" color="error" size="large" fullWidth onClick={() => setShowHomeView(true)}>
                        Volver
                    </Button>
                </Box>
            </Box>
        </React.Fragment>

    )
}

export default TotemHomeView;