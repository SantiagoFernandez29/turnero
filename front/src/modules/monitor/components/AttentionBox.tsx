import { Box, Typography } from "@mui/material";
import useMonitor from "../hooks/use-monitor";

const AttentionBox = () => {
  const { pendingTickets, ticketsReadyToService } = useMonitor();

  console.log("ticketsReadyToService", ticketsReadyToService);

  return (
    <Box className="flex flex-row items-top justify-center gap-10">
      <div>
        <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center" }}>Turno</Typography>
        <Box className="bg-slate-500 flex flex-col gap-10">
          {
            pendingTickets.length > 0 && pendingTickets.map((ticket, index) => (
                <Typography key={index} variant="h6" style={{ fontWeight: "lighter", textAlign: "center", backgroundColor: "white", }}>
                  Turno: {ticket.turn}
                </Typography>
              )
            )
          }
          {
            ticketsReadyToService.length > 0 ? ticketsReadyToService.map((ticket, index) => (
              <Typography key={index} variant="h6" style={{ fontWeight: "normal", textAlign: "center", backgroundColor: "green", color: "white", }}>
                Turno: {ticket.turn}
              </Typography>
            )
          ) : pendingTickets.length === 0 && ticketsReadyToService.length === 0 ? 
            <Typography variant="h6" style={{ fontWeight: "normal", textAlign: "center", backgroundColor: "red", color: "white", }}>
              No hay turnos pendientes
            </Typography>
            : <Typography></Typography>
          }
        </Box>
      </div>
      <div>
        <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center" }}>Box</Typography>
        <Box className="bg-slate-500 flex flex-col gap-10">
        {
            pendingTickets.length > 0 && pendingTickets.map((ticket, index) => (
                <Typography key={index} variant="h6" style={{ fontWeight: "lighter", textAlign: "center", backgroundColor: "white", }}>
                  Box: {ticket.box.name}
                </Typography>
              )
            )
          }
          {
            ticketsReadyToService.length > 0 ? ticketsReadyToService.map((ticket, index) => (
              <Typography key={index} variant="h6" style={{ fontWeight: "normal", textAlign: "center", backgroundColor: "green", color: "white", }}>
                Box: {ticket.box.name}
              </Typography>
            )
          ) : pendingTickets.length === 0 && ticketsReadyToService.length === 0 ? 
            <Typography variant="h6" style={{ fontWeight: "normal", textAlign: "center", backgroundColor: "red", color: "white", }}>
              No hay turnos pendientes
            </Typography>
            : <Typography></Typography>
          }
        </Box>
      </div>
    </Box>
  );
};

export default AttentionBox;
