import { useEffect, useState } from "react";
import { AREAS } from "../../../configs/constants/areas";
import AreaButton from "../components/AreaButton";
import { Box, Button, Typography } from "@mui/material";
import { io } from "socket.io-client";
import { EVENTS } from "../../../configs/constants/events";
import { Area } from "../models/area";
import toast from "react-hot-toast";

const socket = io("http://localhost:3000");

const AreasSection = () => {

    const [turns, setTurns] = useState<number>(0);
    const [waitingCount, setWaitingCount] = useState<number>(0);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Conectado al servidor");
        });

        socket.on("disconnect", () => {
            console.log("Desconectado del servidor");
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.disconnect();
        }

    }, []);

    const handleClickedArea = (area: Area) => {
        toast.success(`Seleccionó el área "${area.name}"`);
        const newTurn = turns + 1;
        const newWaitingCount = waitingCount + 1;
        setTurns(newTurn);
        setWaitingCount(newWaitingCount);

        socket.emit(EVENTS.TOTEM.SELECT_AREA, {
            areaTitle: area.name,
            turn: area.description + newTurn,
            emitedDate: new Date().toLocaleDateString("es-AR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            waitingCount: newWaitingCount,
            voucher: "000000",
        });
    };

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