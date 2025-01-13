import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { useEffect, useState } from "react";
import { Ticket } from "../../shared/components/models/ticket";
import { EVENTS } from "../../../configs/constants/events";


const useMonitor = () => {

    const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
    const socket = io(SOCKET_URL);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Conectado al servidor");
        });

        socket.on("disconnect", () => {
            console.log("Desconectado del servidor");
        });

        socket.on(EVENTS.MONITOR.TICKET_GENERATED, (ticket: Ticket) => {
            setPendingTickets((restTickets) => [ticket, ...restTickets]);
            console.log(ticket);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off(EVENTS.MONITOR.TICKET_GENERATED);
        }

    }, [socket]);

    return { pendingTickets };
}

export default useMonitor;