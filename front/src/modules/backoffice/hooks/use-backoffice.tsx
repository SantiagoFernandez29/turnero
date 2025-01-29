import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import { Ticket } from "../../shared/components/models/ticket";
import toast from "react-hot-toast";
import useAuth from "../../auth/hooks/use-auth";

interface isLoadingI {
    "FINISH": boolean,
    "CANCEL": boolean,
}

const useBackoffice = ( id: number ) => {

    const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
    const [takenTickets, setTakenTickets] = useState<Ticket[]>([]);
    const [ticketRecalled, setTicketRecalled] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(20);
    const [isLoading, setIsLoading] = useState<isLoadingI>({
        "FINISH": false,
        "CANCEL": false,
    });

    const { token } = useAuth();

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

        socket.on(EVENTS.GENERAL.TERMINAL_STATUS, (data) => {
            setPendingTickets(data.pendingTickets);
            setTakenTickets(data.takenTickets);
        })

        socket.on(EVENTS.BACKOFFICE.RECALL_TICKET, (data) => {
            console.log("Ticket recordado")
            console.log(data)
        })

        socket.on(EVENTS.BACKOFFICE.TICKET_FINISHED, (data: { ticketId: number, type: string }) => {
            setIsLoading((prev) => ({ ...prev, [data.type]: false }))
        })

        return () => {
            socket.disconnect();
        }

    }, [socket])

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (timer >= 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        } else {
            setTicketRecalled(false)
            setTimer(20)
        }

        return () => clearInterval(interval)
    }, [timer])

    const handleCallTicket = (ticket: Ticket) => {
        if (takenTickets.length > 0) {
            toast.error("Ya hay un ticket en servicio");
            return;
        }
        const payload = {
            areaId: ticket.areaId,
            ticketId: ticket.id,
        }
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