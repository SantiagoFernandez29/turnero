import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import { Ticket } from "../../shared/components/models/ticket";
import toast from "react-hot-toast";
import sound_effect from "../../../assets/sounds/sound_effect.mp3";
import useAuth from "../../auth/hooks/use-auth";

const useBackoffice = ({ id }: { id: string }) => {

    // const [totalPendingTickets, setTotalPendingTickets] = useState<Ticket[]>([]);
    const [boxPendingTickets, setBoxPendingTickets] = useState<Ticket[]>([]);
    // const [ticketInService, setTicketInService] = useState<Ticket | null>(null);

    const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
    const [takenTickets, setTakenTickets] = useState<Ticket[]>([]);
    const [ticketRecalled, setTicketRecalled] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(20);


    const { token } = useAuth();

    const { current: socket } = useRef<Socket>(
        io(SOCKET_URL, {
            auth: {
                token: token,
            },
            autoConnect: false,
            transports: ["websocket"],
        })
    );

    // console.log("Tickets pendientes", totalPendingTickets);

    useEffect(() => {

        socket.connect();

        socket.on("connect", () => {
            console.log("Conectado al servidor WebSocket")
        });

        socket.on("disconnect", (reason) => {
            console.warn("Socket desconectado:", reason);
        });

        socket.on('TERMINAL_STATUS', (data) => {
            setPendingTickets(data.pendingTickets);
            setTakenTickets(data.takenTickets);
        })

        // socket.on('PENDING_TICKETS', (tickets: Ticket[]) => {
        //     setPendingTickets(tickets);
        // });

        // socket.on('TAKEN_TICKETS', (tickets: Ticket[]) => {
        //     setTakenTickets(tickets);
        // });

        // socket.on(EVENTS.BACKOFFICE.TICKET_GENERATED, (ticket: Ticket) => {
        //     // console.log("Nuevo ticket generado en el totem", ticket);
        //     setTotalPendingTickets((prevTickets) => [...prevTickets, ticket]);
        // });

        // socket.on(EVENTS.BACKOFFICE.NEW_PENDING_TICKETS, (tickets: Ticket[]) => {
        //     // console.log("Tickets pendientes actualizados", tickets);
        //     setTotalPendingTickets(tickets);
        // });

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

    const playSound = () => {
        new Audio(sound_effect).play();
    }

    const handleCallTicket = (ticket: Ticket) => {
        if (takenTickets.length > 0) {
            toast.error("Ya hay un ticket en servicio");
            return;
        }

        const payload = {
            areaId: ticket.areaId,
            ticketUid: ticket.uid,
            prioritary: ticket.prioritary,
        }

        socket.emit('TAKE_TICKET', payload);

        // if (ticketInService === null) {
        //     setTicketInService(ticket);
        //     const newTotalPendingTickets = totalPendingTickets.filter((t) => t.turn !== ticket.turn);
        //     setTotalPendingTickets(newTotalPendingTickets);
        //     socket.emit(EVENTS.BACKOFFICE.PENDING_TICKETS, newTotalPendingTickets);
        //     socket.emit(EVENTS.BACKOFFICE.CALL_TICKET, {
        //         areaTitle: ticket.areaTitle,
        //         turn: ticket.turn,
        //         emitedDate: ticket.emitedDate,
        //         waitingCount: ticket.waitingCount,
        //         voucher: ticket.voucher,
        //         box: {
        //             id: id,
        //             name: `BOX-${id}`,
        //         },
        //     });
        //     socket.emit(EVENTS.BACKOFFICE.PENDING_TICKETS, newTotalPendingTickets);
        // } else {
        //     toast.error("Ya hay un ticket en servicio");
        // }
    }

    // const handleSetTicketInService = (ticket: Ticket | null) => {
    //     if (ticketInService === null) {
    //         setTicketInService(ticket);
    //         const newBoxPendingTickets = boxPendingTickets.filter((t) => t.turn !== ticket?.turn);
    //         setBoxPendingTickets(newBoxPendingTickets);
    //         socket.emit(EVENTS.BACKOFFICE.TICKET_SERVED, {
    //             ticket: {
    //                 areaTitle: ticket?.areaTitle,
    //                 turn: ticket?.turn,
    //                 emitedDate: ticket?.emitedDate,
    //                 waitingCount: ticket?.waitingCount,
    //                 voucher: ticket?.voucher,
    //                 box: {
    //                     id: id,
    //                     name: `BOX-${id}`,
    //                 },
    //             },

    //         });
    //         socket.emit(EVENTS.BACKOFFICE.PENDING_TICKETS, newBoxPendingTickets);
    //     } else {
    //         toast.error("Ya hay un ticket en servicio");
    //     }
    // }

    const handleReiterateTicket = (ticketUid: number) => {
        // socket.emit(EVENTS.BACKOFFICE.RECALLING_TICKET_ALARM);
        setTicketRecalled(true);
        const payload = {
            ticketUid
        }
        socket.emit("RECALL_TICKET", payload)
    }

    const handleFinishTicket = (ticketUid: number, type: string) => {
        // toast.success(`Cliente con Ticket ${ticket.turn} recibido`);
        // setTicketInService(null);
        // socket.emit(EVENTS.BACKOFFICE.FINISH_TICKET, ticket);
        const payload = {
            ticketUid,
            type,
        }
        console.log("Finalizando ticket", payload);
        socket.emit("FINISH_TICKET", payload)
    }

    return { pendingTickets, boxPendingTickets, takenTickets, ticketRecalled, timer, handleCallTicket, setPendingTickets, setTakenTickets, handleFinishTicket, handleReiterateTicket };
}

export default useBackoffice;