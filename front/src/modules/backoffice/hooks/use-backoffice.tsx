import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { environment, SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import { Ticket } from "../../shared/components/models/ticket";
import toast from "react-hot-toast";
import useAuth from "../../auth/hooks/use-auth";

interface isLoadingI {
    "CALL": boolean,
    "FINISH": boolean,
    "CANCEL": boolean,
}

const useBackoffice = (id: number) => {

    const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
    const [takenTickets, setTakenTickets] = useState<Ticket[]>([]);
    const [ticketRecalled, setTicketRecalled] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(5);
    const [isLoading, setIsLoading] = useState<isLoadingI>({
        "CALL": false,
        "FINISH": false,
        "CANCEL": false,
    });
    const [isTicketTaken, setIsTicketTaken] = useState<boolean>(false);

    const { token, logout } = useAuth();

    const { current: socket } = useRef<Socket>(
        io(SOCKET_URL, {
            auth: {
                token: token,
            },
            query: {
                boxId: id,
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
            logout();
            console.warn("Socket desconectado:", reason);
        });

        socket.on(EVENTS.GENERAL.TERMINAL_STATUS, (data) => {
            setPendingTickets(data.pendingTickets);
            setTakenTickets(data.takenTickets);
            setIsLoading((prev) => ({ ...prev, "CALL": false, "FINISH": false, "CANCEL": false }));
        })

        socket.on(EVENTS.BACKOFFICE.TICKET_TAKEN, () => {
            setIsTicketTaken(true);
        });

        return () => {
            socket.disconnect();
        }

    }, [socket]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer >= 0 && ticketRecalled) {
          interval = setInterval(() => {
            setTimer((prev) => prev - 1);
          }, 1000);
        } else {
          setTicketRecalled(false);
          setTimer(5);
        }
    
        return () => clearInterval(interval);
      }, [ticketRecalled, timer]);

    const handleCallTicket = (ticket: Ticket) => {
        if (takenTickets.length > 0) {
            toast.error("Ya hay un ticket en servicio");
            return;
        }
        const payload = {
            areaId: ticket.areaId,
            ticketId: ticket.id,
        }
        setIsLoading((prev) => ({ ...prev, "CALL": true }));
        
        socket.emit(EVENTS.BACKOFFICE.TAKE_TICKET, payload);
    }

    const handleReiterateTicket = (ticketId: number) => {
        setTicketRecalled(true);
        const payload = {
            ticketId
        }
        socket.emit(EVENTS.BACKOFFICE.RECALL_TICKET, payload)
    }

    const handleFinishTicket = (ticketId: number, type: string) => {
        const payload = {
            ticketId,
            type,
        }
        setIsLoading((prev) => ({ ...prev, [type]: true }));
        socket.emit(EVENTS.BACKOFFICE.FINISH_TICKET, payload)
    }

    return { pendingTickets, takenTickets, ticketRecalled, timer, isLoading, handleCallTicket, setPendingTickets, setTakenTickets, handleFinishTicket, handleReiterateTicket };
}

export default useBackoffice;