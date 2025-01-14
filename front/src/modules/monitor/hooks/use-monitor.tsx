import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { useEffect, useState } from "react";
import { Ticket } from "../../shared/components/models/ticket";
import { EVENTS } from "../../../configs/constants/events";
import sound_effect from "../../../assets/sounds/sound_effect.mp3";


const useMonitor = () => {

    const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
    const [ticketsReadyToService, setTicketsReadyToService] = useState<Ticket[]>([]);

    const socket = io(SOCKET_URL);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Conectado al servidor");
        });

        socket.on("disconnect", () => {
            console.log("Desconectado del servidor");
        });

        socket.on(EVENTS.MONITOR.TICKET_GENERATED, (ticket: Ticket) => {
            setPendingTickets((prevTickets) => [...prevTickets, ticket]);
            console.log("Ticket del backoffice: ", ticket);
            console.log("Tickets pendientes: ", pendingTickets);
        });

        socket.on(EVENTS.MONITOR.FINISH_TICKET, (ticket: Ticket) => {
            setTicketsReadyToService((prevTickets) => prevTickets.filter((t) => t.turn !== ticket.turn));
        });

        socket.on(EVENTS.MONITOR.TICKET_SERVED, (ticket: Ticket) => {
            setTicketsReadyToService((prevTickets) => [...prevTickets, ticket]);
            setPendingTickets((prevTickets) => prevTickets.filter((t) => t.turn !== ticket.turn));
            new Audio(sound_effect).play();
        });

        socket.on(EVENTS.MONITOR.RECALLING_TICKET_ALARM, () => {
            new Audio(sound_effect).play();
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off(EVENTS.MONITOR.TICKET_GENERATED);
            socket.off(EVENTS.MONITOR.FINISH_TICKET);
            socket.off(EVENTS.MONITOR.TICKET_SERVED);
        }

    }, [socket]);

    return { pendingTickets, ticketsReadyToService };
}

export default useMonitor;