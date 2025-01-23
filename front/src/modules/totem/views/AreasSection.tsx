import AreaButton from "../components/AreaButton";
import { Box, Button, Typography } from "@mui/material";
import useTotem from "../hooks/use-totem";
import { useEffect } from "react";
import { useProcedures } from "../hooks/use-procedures";
import useAuth from "../../auth/hooks/use-auth";

const AreasSection = () => {

    const { user } = useAuth();
    const { data: tramites } = useProcedures(user ? user?.areaId : -1);

    const { handleClickedArea, connectToServer } = useTotem();

    useEffect(() => {
        connectToServer();
    }, [connectToServer])

    return (
        <Box className="flex flex-col items-center gap-10 place-content-between m-5">
            <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center" }}> Seleccione el área sobre la cual desea solicitar un turno </Typography>
            <Box className="grid grid-cols-2 gap-4 w-full">
                {tramites && tramites.map((tramite) => (
                    <AreaButton key={tramite.id} title={tramite.name} onClick={() => handleClickedArea(tramite)} />
                ))}
            </Box>
            <Button variant="contained" color="error" size="large" fullWidth onClick={() => window.history.back()}>
                Volver
            </Button>
        </Box>

    )
}

export default AreasSection;