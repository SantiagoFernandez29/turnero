import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { useEffect, useRef, useState } from "react";
import { Ticket } from "../../shared/components/models/ticket";
import { EVENTS } from "../../../configs/constants/events";
import sound_effect from "../../../assets/sounds/sound_effect.mp3";
import useAuth from "../../auth/hooks/use-auth";


const useMonitor = () => {

    const { token } = useAuth();

    const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
    const [takenTickets, setTakenTickets] = useState<Ticket[]>([]);
    const [ticketRecalled, setTicketRecalled] = useState<boolean>(false);
    const [recalledTicketId, setRecalledTicketId] = useState<number | null>(null);

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

        socket.on(EVENTS.GENERAL.TERMINAL_STATUS, (data) => {
            console.log(data);
            setPendingTickets(data.pendingTickets);
            setTakenTickets(data.takenTickets);
        });

        socket.on(EVENTS.MONITOR.TICKET_TAKEN, (ticket: Ticket) => {
            setTicketRecalled(true);
            new Audio(sound_effect).play();
            setTimeout(() => {
                setTicketRecalled(false);
            }, 5000);
            setRecalledTicketId(ticket.id);
        });

        socket.on(EVENTS.MONITOR.RECALL_TICKET, (ticket: Ticket) => {
            setTicketRecalled(true);
            new Audio(sound_effect).play();
            setTimeout(() => {
                setTicketRecalled(false);
            }, 5000);
            setRecalledTicketId(ticket.id);
            console.log("ticket: ", ticket);
            console.log("recalledTicketId: ", ticket.id);
        });

        return () => {
            socket.disconnect();
        }

    }, [socket]);

    return { pendingTickets, takenTickets, ticketRecalled, recalledTicketId };
}

export default useMonitor;