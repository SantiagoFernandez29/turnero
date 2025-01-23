import { useCallback, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../configs/constants/url";
import { EVENTS } from "../../../configs/constants/events";
import toast from "react-hot-toast";
import { Procedure } from "../models/procedure";
import useAuth from "../../auth/hooks/use-auth";


const useTotem = () => {
    const { token, user } = useAuth();

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
            console.log("Conectado al servidor WebSocket")
          });
          
          socket.on("disconnect", (reason) => {
            console.warn("Socket desconectado:", reason);
          });

          socket.on("TERMINAL_STATUS", (areas: any[]) => {
            console.log("Areas:", areas);
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

    const handleClickedArea = (tramite: Procedure) => {
        toast.success(`Seleccionó el trámite "${tramite.name}"`);
        // const newTurn = turns + 1;
        // setTurns(newTurn);
        
        // socket.emit(EVENTS.TOTEM.SELECT_AREA, {
        //     areaTitle: area.name,
        //     turn: area.code + newTurn,
        //     emitedDate: new Date().toLocaleDateString("es-AR", {
        //         year: "numeric",
        //         month: "numeric",
        //         day: "numeric",
        //         hour: "2-digit",
        //         minute: "2-digit"
        //     }),
        //     waitingCount: waitingCount,
        //     voucher: "000000",
        // });
        // const newWaitingCount = waitingCount + 1;
        // setWaitingCount(newWaitingCount);

        const payload = {
            areaId: tramite.areaId,
            prioritary: true,
            userIdentifier: String(user?.id || -1),
            procedureId: tramite.id,
          };
      
        socket.emit("CREATE_TICKET", payload);


    };

    return { handleClickedArea, connectToServer };
};

export default useTotem;