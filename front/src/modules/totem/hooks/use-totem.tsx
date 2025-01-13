import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { Area } from "../models/area";
import { EVENTS } from "../../../configs/constants/events";
import toast from "react-hot-toast";


const useTotem = () => {

    const [turns, setTurns] = useState<number>(0);
    const [waitingCount, setWaitingCount] = useState<number>(0);

    const socket = io(SOCKET_URL);


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

    return { handleClickedArea };
};

export default useTotem;