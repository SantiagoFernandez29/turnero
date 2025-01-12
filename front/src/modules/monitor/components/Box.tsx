import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { EVENTS } from "../../../configs/constants/events";

const socket = io("http://localhost:3000");

export interface Turns {
  turn: string;
  box: number;
}

const AttentionBox = () => {
    const [pendingTickets, setPendingTickets] = useState<Turns[]>(() => {
        const savedTickets = localStorage.getItem("pendingTickets");
        return savedTickets ? JSON.parse(savedTickets) : [];
      });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor");
    });

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor");
    });

    socket.on(EVENTS.MONITOR.TICKET_GENERATED, (data: Turns) => {
      setPendingTickets((restTickets) => {
        const updatedTickets = [data, ...restTickets]
        localStorage.setItem("pendingTickets", JSON.stringify(updatedTickets));
        return updatedTickets;
    });
      console.log(data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off(EVENTS.MONITOR.TICKET_GENERATED);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("Tickets pendientes", pendingTickets);
  }, [pendingTickets]);

  return (
    <Box className="flex flex-row items-top justify-center gap-10">
      <div>
        <Typography
          variant="h4"
          style={{ fontWeight: "lighter", textAlign: "center" }}
        >
          Turno
        </Typography>
        <Box className="bg-slate-500 flex flex-col gap-10">
          {pendingTickets.length > 1 &&
            pendingTickets
              .slice(0, pendingTickets.length - 1)
              .map((ticket, index) => (
                <Typography
                  key={index}
                  variant="h6"
                  style={{
                    fontWeight: "lighter",
                    textAlign: "center",
                    backgroundColor: "white",
                  }}
                >
                  Turno: {ticket.turn}
                </Typography>
              ))}
          <Typography
            variant="h6"
            style={{
              fontWeight: "normal",
              textAlign: "center",
              backgroundColor: "green",
              color: "white",
            }}
          >
            {pendingTickets.length > 1
              ? `Turno: ${pendingTickets[pendingTickets.length - 1].turn}`
              : pendingTickets.length === 1
              ? `Turno: ${pendingTickets[0].turn}`
              : "No hay turnos pendientes"}
          </Typography>
        </Box>
      </div>
      <div>
        <Typography
          variant="h4"
          style={{ fontWeight: "lighter", textAlign: "center" }}
        >
          {" "}
          Box{" "}
        </Typography>
        <Box className="bg-slate-500 flex flex-col gap-10">
          {pendingTickets.length > 1 &&
            pendingTickets
              .slice(0, pendingTickets.length - 1)
              .map((ticket, index) => (
                <Typography
                  key={index}
                  variant="h6"
                  style={{
                    fontWeight: "lighter",
                    textAlign: "center",
                    backgroundColor: "white",
                  }}
                >
                  Box: {ticket.box}
                </Typography>
              ))}
          <Typography
            variant="h6"
            style={{
              fontWeight: "normal",
              textAlign: "center",
              backgroundColor: "green",
              color: "white",
            }}
          >
            {pendingTickets.length > 1
              ? `Box: ${pendingTickets[pendingTickets.length - 1].box}`
              : pendingTickets.length === 1
              ? `Box: ${pendingTickets[0].box}`
              : "No hay turnos pendientes"}
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default AttentionBox;
