import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import { Ticket } from "../../shared/components/models/ticket";
import toast from "react-hot-toast";
import sound_effect from "../../../assets/sounds/sound_effect.mp3";

const useBackoffice = ({ id }: { id: string }) => {

    const [totalPendingTickets, setTotalPendingTickets] = useState<Ticket[]>([]);
    const [boxPendingTickets, setBoxPendingTickets] = useState<Ticket[]>([]);
    const [ticketInService, setTicketInService] = useState<Ticket | null>(null);

    const socket = io(SOCKET_URL);

    console.log("Tickets pendientes", totalPendingTickets);

    useEffect(() => {

        socket.on("connect", () => {
            console.log("Conectado al servidor");
        });

        socket.on("disconnect", () => {
            console.log("Desconectado del servidor");
        });

        socket.on(EVENTS.BACKOFFICE.TICKET_GENERATED, (ticket: Ticket) => {
            console.log("Nuevo ticket generado en el totem", ticket);
            setTotalPendingTickets((prevTickets) => [...prevTickets, ticket]);
        });

        socket.on(EVENTS.BACKOFFICE.NEW_PENDING_TICKETS, (tickets: Ticket[]) => {
            console.log("Tickets pendientes actualizados", tickets);
            setTotalPendingTickets(tickets);
        });



        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off(EVENTS.BACKOFFICE.TICKET_GENERATED);
            socket.off(EVENTS.BACKOFFICE.NEW_PENDING_TICKETS);
        }

    }, [socket])

    const playSound = () => {
        new Audio(sound_effect).play();
    }

    const handleCallTicket = (ticket: Ticket) => {
        const newTotalPendingTickets = totalPendingTickets.filter((t) => t.turn !== ticket.turn);
        setTotalPendingTickets(newTotalPendingTickets);
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
        socket.emit(EVENTS.BACKOFFICE.PENDING_TICKETS, newTotalPendingTickets);
        setBoxPendingTickets((prevTickets) => [...prevTickets, ticket]);
    }

    const handleSetTicketInService = (ticket: Ticket | null) => {
        if(ticketInService === null) {
            setTicketInService(ticket);
            const newBoxPendingTickets = boxPendingTickets.filter((t) => t.turn !== ticket?.turn);
            setBoxPendingTickets(newBoxPendingTickets);
            socket.emit(EVENTS.BACKOFFICE.TICKET_SERVED,  {
                areaTitle: ticket?.areaTitle,
                turn: ticket?.turn,
                emitedDate: ticket?.emitedDate,
                waitingCount: ticket?.waitingCount,
                voucher: ticket?.voucher,
                box: {
                    id: id,
                    name: `BOX-${id}`,
                },
            });
        } else {
            toast.error("Ya hay un ticket en servicio");
        }
    }

    const handleReiterateTicket = () => {
        socket.emit(EVENTS.BACKOFFICE.RECALLING_TICKET_ALARM);
    }

    const handleFinishTicket = (ticket: Ticket) => {
        toast.success(`Cliente con Ticket ${ticket.turn} recibido`);
        setTicketInService(null);
        socket.emit(EVENTS.BACKOFFICE.FINISH_TICKET, ticket);
    }

    return { totalPendingTickets, boxPendingTickets, ticketInService, handleCallTicket, handleSetTicketInService, handleFinishTicket, handleReiterateTicket };
}

export default useBackoffice;