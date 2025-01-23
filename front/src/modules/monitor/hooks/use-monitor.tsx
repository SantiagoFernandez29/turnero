import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { useEffect, useRef, useState } from "react";
import { Ticket } from "../../shared/components/models/ticket";
import { EVENTS } from "../../../configs/constants/events";
import sound_effect from "../../../assets/sounds/sound_effect.mp3";
import useAuth from "../../auth/hooks/use-auth";


const useMonitor = () => {

    const { token } = useAuth();
    // const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
    // const [ticketsReadyToService, setTicketsReadyToService] = useState<Ticket[]>([]);

    const [pendingTickets, setPendingTickets] = useState<Ticket[]>([]);
  const [takenTickets, setTakenTickets] = useState<Ticket[]>([]);

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

        socket.on("connect", () => {
            console.log("Conectado al servidor WebSocket")
        });

        socket.on("disconnect", (reason) => {
            console.warn("Socket desconectado:", reason);
        });

        socket.on("TERMINAL_STATUS", (data) => {
            console.log(data);
            setPendingTickets(data.pendingTickets);
            setTakenTickets(data.takenTickets);
        });

        // socket.on(EVENTS.MONITOR.TICKET_GENERATED, (ticket: Ticket) => {
        //     setPendingTickets((prevTickets) => [...prevTickets, ticket]);
        //     console.log("Ticket del backoffice: ", ticket);
        //     console.log("Tickets pendientes: ", pendingTickets);
        // });

        // socket.on(EVENTS.MONITOR.FINISH_TICKET, (ticket: Ticket) => {
        //     setTicketsReadyToService((prevTickets) => prevTickets.filter((t) => t.turn !== ticket.turn));
        // });

        // socket.on(EVENTS.MONITOR.TICKET_CALLED, (ticket: Ticket) => {
        //     setTicketsReadyToService((prevTickets) => [...prevTickets, ticket]);
        //     setPendingTickets((prevTickets) => prevTickets.filter((t) => t.turn !== ticket.turn));
        //     new Audio(sound_effect).play();
        // });

        socket.on(EVENTS.MONITOR.RECALLING_TICKET_ALARM, () => {
            new Audio(sound_effect).play();
        });

        socket.on("RECALL_TICKET", () => {
            // play();
        });

        return () => {
            socket.disconnect();
        }

    }, [socket]);

    return { pendingTickets, takenTickets };
}

export default useMonitor;