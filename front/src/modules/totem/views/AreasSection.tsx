import { AREAS } from "../../../configs/constants/areas";
import AreaButton from "../components/AreaButton";
import { Box, Button, Typography } from "@mui/material";
import useTotem from "../hooks/use-totem";

const AreasSection = () => {

    const { handleClickedArea } = useTotem();

    return (
        <Box className="flex flex-col items-center gap-10 place-content-between m-5">
            <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center" }}> Seleccione el área sobre la cual desea solicitar un turno </Typography>
            <Box className="grid grid-cols-2 gap-4 w-full">
                {AREAS.map((area) => (
                    <AreaButton key={area.id} title={area.name} onClick={() => handleClickedArea(area)} />
                ))}
            </Box>
            <Button variant="contained" color="error" size="large" fullWidth onClick={() => window.history.back()}>
                Volver
            </Button>
        </Box>

    )
}

export default AreasSection;