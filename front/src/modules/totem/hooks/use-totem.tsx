import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import toast from "react-hot-toast";
import { Procedure } from "../models/procedure";
import useAuth from "../../auth/hooks/use-auth";
import { AreaDto } from "../dto/area";


const useTotem = () => {
    const { token } = useAuth();

    const [area, setArea] = useState<string>("");
    const [showHomeView, setShowHomeView] = useState<boolean>(true);

    const { current: socket } = useRef<Socket>(
        io(SOCKET_URL, {
            auth: {
                token: token,
            },
            autoConnect: false,
            transports: ["websocket"],
        })
    );

    useEffect(() => {
        socket.connect();

        socket.on(EVENTS.GENERAL.CONNECT, () => {
            console.log("Conectado al servidor WebSocket")
        });

        socket.on(EVENTS.GENERAL.DISCONNECT, (reason) => {
            console.warn("Socket desconectado:", reason);
        });

        socket.on(EVENTS.GENERAL.TERMINAL_STATUS, (areas: AreaDto) => {
            setArea(areas.areas[0].name);
        });

        socket.on(EVENTS.GENERAL.MAX_PENDING_QUEUE_ALERT_ON, () => {
            toast.error("La cola de espera está llena. Por favor, vuelva más tarde.");
            setShowHomeView(true);
        });

        return () => {
            socket.disconnect();
        }

    }, [socket]);

    const handleClickedArea = (tramite: Procedure) => {
        const payload = {
            areaId: tramite.areaId,
            prioritary: true,
            procedureId: tramite.id,
        };

        socket.emit(EVENTS.TOTEM.CREATE_TICKET, payload);
        toast.success(`Seleccionó el trámite "${tramite.name}"`);
        setShowHomeView(true)
    };

    return { handleClickedArea, setShowHomeView, showHomeView, area };
};

export default useTotem;