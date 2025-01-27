import AreaButton from "../components/AreaButton";
import { Box, Button, Typography } from "@mui/material";
import useTotem from "../hooks/use-totem";
import React from "react";
import { useProcedures } from "../hooks/use-procedures";
import useAuth from "../../auth/hooks/use-auth";

const TotemHomeView = () => {

    const { user, token } = useAuth();
    const { data: tramites } = useProcedures(token ? token : "", user ? user.areaId : -1);
    const { handleClickedArea, setShowHomeView, showHomeView, area } = useTotem();

    return (
        <React.Fragment>
            <Box className={`${showHomeView ? "flex" : "hidden"}`}>
                <Box className={`flex flex-col justify-center items-center}`} onClick={() => setShowHomeView(false)}>
                    <Typography variant="h1" style={{ fontWeight: "lighter", textAlign: "center", fontFamily: "inherit" }}> Bienvenido al Turnero Municipal! </Typography>
                    <Typography variant="h2" style={{ fontWeight: "bold", textAlign: "center", fontFamily: "inherit", color: "indigo" }}> {area} </Typography>
                    <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center", fontFamily: "inherit" }}> Por favor, presione en cualquier parte de la pantalla para solicitar un turno según el trámite. </Typography>
                </Box>
            </Box>
            <Box className={`${showHomeView ? "hidden" : "flex"}`}>
                <Box className="flex flex-col items-center gap-10 place-content-between m-5">
                    <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center" }}> Seleccione el trámite sobre el cual desea solicitar un turno. </Typography>
                    <Box className="grid grid-cols-2 gap-4 w-full">
                        {tramites && tramites.map((tramite) => (
                            <AreaButton key={tramite.id} title={tramite.name} onClick={() => handleClickedArea(tramite)} />
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