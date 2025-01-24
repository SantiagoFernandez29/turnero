import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import { Ticket } from "../../shared/components/models/ticket";
import toast from "react-hot-toast";
import sound_effect from "../../../assets/sounds/sound_effect.mp3";
import useAuth from "../../auth/hooks/use-auth";

interface isLoadingI {
    "FINISH": boolean,
    "CANCEL": boolean,
}

const useBackoffice = ({ id }: { id: string }) => {

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
            console.log(data.message)
        })

        socket.on(EVENTS.BACKOFFICE.TICKET_FINISHED, (data: {ticketUid: number, type: string}) => {
            setIsLoading((prev) => ({...prev, [data.type]: false}))
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

    // const playSound = () => {
    //     new Audio(sound_effect).play();
    // }

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
        socket.emit(EVENTS.BACKOFFICE.TAKE_TICKET, payload);
    }

    const handleReiterateTicket = (ticketUid: number) => {
        setTicketRecalled(true);
        const payload = {
            ticketUid
        }
        socket.emit(EVENTS.BACKOFFICE.RECALL_TICKET, payload)
    }

    const handleFinishTicket = (ticketUid: number, type: string) => {
        const payload = {
            ticketUid,
            type,
        }
        setIsLoading((prev) => ({...prev, [type]: true}));
        socket.emit(EVENTS.BACKOFFICE.FINISH_TICKET, payload)
    }

    return { pendingTickets, takenTickets, ticketRecalled, timer, isLoading, handleCallTicket, setPendingTickets, setTakenTickets, handleFinishTicket, handleReiterateTicket };
}

export default useBackoffice;