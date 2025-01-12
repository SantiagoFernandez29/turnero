import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { Turns } from "../../monitor/components/Box";
import { EVENTS } from "../../../configs/constants/events";

const socket = io("http://localhost:3000");

const BackofficeHomeView = () => {
  const { id } = useParams<{ id: string }>();
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
      localStorage.removeItem("pendingTickets");
    });

    socket.on(EVENTS.MONITOR.TICKET_GENERATED, (data: Turns) => {
      setPendingTickets((restTickets) => {
        const updatedTickets = [data, ...restTickets];
        localStorage.setItem("pendingTickets", JSON.stringify(updatedTickets));
        return updatedTickets;
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  const handleCallTicket = (ticket: Turns) => {
    socket.emit(EVENTS.BACKOFFICE.CALL_TICKET, { 
      ticket: {
        turn: ticket.turn,
        box: id ? parseInt(id) : -1,
      } });
    console.log("Llamando a ticket", ticket);
  }

  return (
    <Box className="flex flex-col items-center gap-10 m-5">
      <Typography variant="h3" className="text-center">
        Backoffice Home View
      </Typography>
      <Typography variant="h4">
        Box <span className="text-red-500">{id}</span>
      </Typography>
      <Box>
        <Typography variant="h4">Tickets pendientes:</Typography>
        <Box className=" flex flex-col gap-10">
          {/* INVERTIR EL ÓRDEN DE LA LISTA DE TICKETS PENDIENTES */}
          {pendingTickets.length > 1 &&
            pendingTickets.map((ticket, index) => (
              <Box
                key={index}
                className="flex flex-row items-center justify-between"
              >
                <Typography
                  key={index}
                  variant="h6"
                  style={{ fontWeight: "lighter" }}
                >
                  {ticket.turn}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => handleCallTicket(ticket)}>
                  Llamar
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BackofficeHomeView;
