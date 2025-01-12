import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import PATHS from "../../../configs/constants/paths";

const TotemHomeView = () => {

    const navigate = useNavigate();

    return(
        <div className="flex flex-col justify-center items-center gap-10" onClick={() => navigate(PATHS.TOTEM.AREAS)}>
            <Typography variant="h1" style={{ fontWeight: "lighter", textAlign: "center" }}> Bienvenido al Turnero Municipal! </Typography>
            <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center" }}> Por favor, presione en cualquier parte de la pantalla para solicitar un turno según el área. </Typography>
        </div>
    )
}

export default TotemHomeView;