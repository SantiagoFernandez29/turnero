import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { environment, SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import toast from "react-hot-toast";
import { Procedure } from "../models/procedure";
import useAuth from "../../auth/hooks/use-auth";
import { AreaDto } from "../dto/area";
import { Ticket } from "../../shared/components/models/ticket";


const useTotem = () => {
    const { token, logout } = useAuth();

    const [area, setArea] = useState<string>("");
    const [showHomeView, setShowHomeView] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [priority, setPriority] = useState(false);
    const [document, setDocument] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [tramiteSelected, setTramiteSelected] = useState<Procedure>();
    const [ticketCreated, setTicketCreated] = useState<Ticket>();

    const { current: socket } = useRef<Socket>(
        io(SOCKET_URL, {
            auth: {
                token: token,
            },
            autoConnect: false,
            transports: ["websocket"],
            path: (environment === "PROD" || environment === "DEV") ? "/api/socket.io/" : "/socket.io/",
        })
    );

    useEffect(() => {
        socket.connect();

        socket.on(EVENTS.GENERAL.CONNECT, () => {
            console.log("Conectado al servidor WebSocket")
        });

        socket.on(EVENTS.GENERAL.CONNECT_ERROR, (error) => {
            toast.error(error.message);
            logout();
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

        socket.on(EVENTS.TOTEM.TICKET_CREATED, (ticket: Ticket) => {
            setTicketCreated(ticket);
            setIsLoading(false);
        })

        return () => {
            socket.disconnect();
        }

    }, [socket]);

    const handleClickedArea = (tramite: Procedure) => {
        setTramiteSelected(tramite);
        const payload = {
            document: Number(document),
            prioritary: priority,
            procedureId: tramite.id,
        };
        setDocument("");
        setPriority(false);
        setIsLoading(true);
        socket.emit(EVENTS.TOTEM.CREATE_TICKET, payload);
        setOpenModal(true);
    };


    return { handleClickedArea, setShowHomeView, setPriority, setDocument, setOpenModal, showHomeView, area, isLoading, priority, document, openModal, tramiteSelected, ticketCreated };
};

export default useTotem;