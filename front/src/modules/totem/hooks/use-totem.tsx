import { useCallback, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import toast from "react-hot-toast";
import { Procedure } from "../models/procedure";
import useAuth from "../../auth/hooks/use-auth";


const useTotem = () => {
    const { token } = useAuth();

    const [turns, setTurns] = useState<number>(0);
    const [waitingCount, setWaitingCount] = useState<number>(0);
    const { current: socket} = useRef<Socket>(
        io(SOCKET_URL, {
            auth: {
                token: token,
            },
            autoConnect: false,
            transports: ["websocket"],
        })
    );

    const connectToServer = useCallback(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("Conectado al servidor");
        });
    
        socket.on("disconnect", () => {
            console.log("Desconectado del servidor");
        });

        socket.on(EVENTS.GENERAL.FINISH_TICKET, (pendingTickets) => {
            if(pendingTickets.length === 0){
                setWaitingCount(0)
            } else {
                setWaitingCount(pendingTickets.length);
            }
        });
    
        return () => {
            socket.disconnect();
        }
    
    }, [socket]);

    const handleClickedArea = (area: Procedure) => {
        toast.success(`Seleccionó el área "${area.name}"`);
        const newTurn = turns + 1;
        setTurns(newTurn);
        
        socket.emit(EVENTS.TOTEM.SELECT_AREA, {
            areaTitle: area.name,
            turn: area.code + newTurn,
            emitedDate: new Date().toLocaleDateString("es-AR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }),
            waitingCount: waitingCount,
            voucher: "000000",
        });
        const newWaitingCount = waitingCount + 1;
        setWaitingCount(newWaitingCount);

        socket.emit("CREATE_TICKET", {
            areaId: 1,
            prioritary: true,
            userIdentifier: "1",
            procedureId: 1,
          });


    };

    return { handleClickedArea, connectToServer };
};

export default useTotem;