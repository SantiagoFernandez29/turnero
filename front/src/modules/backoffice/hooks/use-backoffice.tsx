import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import { Ticket } from "../../shared/components/models/ticket";


const useBackoffice = ({ id }: { id: string }) => {

    const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
    const socket = io(SOCKET_URL);

    console.log("Tickets pendientes", pendingTickets);

    useEffect(() => {

        socket.on("connect", () => {
            console.log("Conectado al servidor");
        });

        socket.on("disconnect", () => {
            console.log("Desconectado del servidor");
        });

        socket.on(EVENTS.BACKOFFICE.TICKET_GENERATED, (ticket: Ticket) => {
            console.log("Nuevo ticket generado en el totem", ticket);
            setPendingTickets((prevTickets) => [...prevTickets, ticket]);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off(EVENTS.BACKOFFICE.TICKET_GENERATED);
        }

    }, [socket])

    // arreglar el tipado de ticket

    const handleCallTicket = (ticket: Ticket) => {
        setPendingTickets((prevTickets) => [...prevTickets.filter((t) => t.turn !== ticket.turn)]);
        socket.emit(EVENTS.BACKOFFICE.CALL_TICKET, {
            areaTitle: ticket.areaTitle,
            turn: ticket.turn,
            emitedDate: ticket.emitedDate,
            waitingCount: ticket.waitingCount,
            voucher: ticket.voucher,
            box: {
                id: id,
                name: `BOX-${id}`,
            },
        });
    }

    return { pendingTickets, handleCallTicket };
}

export default useBackoffice;