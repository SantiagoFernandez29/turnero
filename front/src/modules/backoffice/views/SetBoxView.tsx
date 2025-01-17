import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import PATHS from "../../../configs/constants/paths";
import { useState } from "react";


const SetBoxView = () => {

    const navigate = useNavigate();

    const [id, setId] = useState<string>("")
    const [boxSelected, setBoxSelected] = useState<boolean>(false)

    const boxList = [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
        { id: 5, name: "5" },
    ]

    const handleOnClickLogin = () => {
        navigate(`${PATHS.BACKOFFICE.HOME + PATHS.BACKOFFICE.BOX.replace(':id', id)}`)
    }

    const handleOnClickOption = (option: string) => {
        setId(option)
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
                {boxList.map((box) => {
                    return <MenuItem key={box.id} value={box.name} onClick={() => handleOnClickOption(box.name)}>{box.name}</MenuItem>
                })}
            </TextField>
            <Button variant="contained" color="secondary" className="w-1/2" disabled={!boxSelected} onClick={handleOnClickLogin} style={{ fontWeight: "bold", fontFamily: "inherit" }}>
                Ingresar
            </Button>
        </Box>
    )
};

export default SetBoxView;