import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import PATHS from "../../../configs/constants/paths";
import { useState } from "react";
import { useGetBoxes } from "../hooks/useGetBoxes";
import useAuth from "../../auth/hooks/use-auth";
import { BoxType } from "../models/box";


const SetBoxView = () => {

    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [id, setId] = useState<string>("")
    const [boxSelected, setBoxSelected] = useState<boolean>(false)
    const boxes = useGetBoxes(Number(user?.areaId), token as string);


    const handleOnClickLogin = () => {
        navigate(`${PATHS.BACKOFFICE.HOME + PATHS.BACKOFFICE.BOX.replace(':id', id)}`)
    }

    const handleOnClickOption = (box: BoxType) => {
        setId(String(box.id))
        localStorage.setItem("box", JSON.stringify(box))
        setBoxSelected(true)
    }

    return (
        <Box className="flex flex-col items-center justify-center gap-4">
            <Box className="w-2/3">
                <Typography variant="h5" style={{ fontFamily: "inherit", textAlign: "center" }} >Seleccione el número de BOX en el que se encuentra</Typography>
            </Box>
            <TextField
                label="Box"
                variant="outlined"
                color="secondary"
                className="w-1/2"
                select
            >
                { boxes ? boxes.boxes?.map((box) => {
                    return <MenuItem key={box.id} value={box.name} onClick={() => handleOnClickOption(box)}>{box.name}</MenuItem>
                }) : 'No hay boxes disponibles'}
            </TextField>
            <Button variant="contained" color="secondary" className="w-1/2" disabled={!boxSelected} onClick={handleOnClickLogin} style={{ fontWeight: "bold", fontFamily: "inherit" }}>
                Ingresar
            </Button>
        </Box>
    )
};

export default SetBoxView;