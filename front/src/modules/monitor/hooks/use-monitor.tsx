import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { useEffect, useRef, useState } from "react";
import { Ticket } from "../../shared/components/models/ticket";
import { EVENTS } from "../../../configs/constants/events";
import sound_effect from "../../../assets/sounds/sound_effect.mp3";
import useAuth from "../../auth/hooks/use-auth";
import toast from "react-hot-toast";


const useMonitor = () => {

    const { token, logout } = useAuth();

    const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
    const [takenTickets, setTakenTickets] = useState<Ticket[]>([]);
    const [ticketRecalled, setTicketRecalled] = useState<Record<number, boolean>>({});
    const [idTicketRecalled, setIdTicketRecalled] = useState<Record<number, boolean>>({});

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

        socket.on(EVENTS.GENERAL.CONNECT_ERROR, (error) => {
            toast.error(error.message);
            logout();
        });
        
        socket.on(EVENTS.GENERAL.DISCONNECT, (reason) => {
            logout();
            console.warn("Socket desconectado:", reason);
        });

        socket.on(EVENTS.GENERAL.TERMINAL_STATUS, (data) => {
            console.log(data.pendingTickets);
            setPendingTickets(data.pendingTickets);
            setTakenTickets(data.takenTickets);
        });

        socket.on(EVENTS.MONITOR.TICKET_TAKEN, (ticket: Ticket) => {
            setIdTicketRecalled((prevState) => ({ ...prevState, [ticket.id]: true }));
            setTicketRecalled((prevState) => ({ ...prevState, [ticket.id]: true }));
            new Audio(sound_effect).play();
            setTimeout(() => {
                setTicketRecalled((prevState) => ({ ...prevState, [ticket.id]: false }));
                setIdTicketRecalled((prevState) => ({ ...prevState, [ticket.id]: false }));
            }, 5000);
        });

        socket.on(EVENTS.MONITOR.RECALL_TICKET, (ticket: Ticket) => {
            setIdTicketRecalled((prevState) => ({ ...prevState, [ticket.id]: true }));
            setTicketRecalled((prevState) => ({ ...prevState, [ticket.id]: true }));
            new Audio(sound_effect).play();
            setTimeout(() => {
                setTicketRecalled((prevState) => ({ ...prevState, [ticket.id]: false }));
                setIdTicketRecalled((prevState) => ({ ...prevState, [ticket.id]: false }));
            }, 5000);
            console.log("ticket: ", ticket);
            console.log("recalledTicketId: ", ticket.id);
        });

        return () => {
            socket.disconnect();
        }

    }, [socket]);

    return { pendingTickets, takenTickets, ticketRecalled, idTicketRecalled };
}

export default useMonitor;