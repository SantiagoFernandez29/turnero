import { Box, Button, Typography } from "@mui/material";
import { useParams } from "react-router";
import useBackoffice from "../hooks/use-backoffice";

const BackofficeHomeView = () => {
  const { id } = useParams<{ id: string }>();
  const {
    totalPendingTickets,
    boxPendingTickets,
    ticketInService,
    handleCallTicket,
    handleSetTicketInService,
    handleFinishTicket,
    handleReiterateTicket,
  } = useBackoffice(id ? { id } : { id: "" });

  console.log(totalPendingTickets);

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
          {totalPendingTickets.length >= 1 &&
            totalPendingTickets.map((ticket, index) => (
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCallTicket(ticket)}
                >
                  Adjudicar
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">Tickets llamados:</Typography>
        <Box className=" flex flex-col gap-10">
          {boxPendingTickets.length >= 1 &&
            boxPendingTickets.map((ticket, index) => (
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
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleSetTicketInService(ticket)}
                >
                  Atender
                </Button>
              </Box>
            ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">Ticket en servicio:</Typography>
        <Box className=" flex flex-col gap-10">
          {ticketInService && (
            <Box className="flex flex-row items-center justify-between">
              <Typography variant="h6" style={{ fontWeight: "lighter" }}>
                {ticketInService.turn}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleFinishTicket(ticketInService)}
              >
                Finalizar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleReiterateTicket()}
              >
                Reiterar
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BackofficeHomeView;
