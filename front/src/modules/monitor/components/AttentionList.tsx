import { Box, Typography } from "@mui/material";
import useMonitor from "../hooks/use-monitor";

const AttentionList = () => {
  const { pendingTickets, takenTickets, ticketRecalled, idTicketRecalled } = useMonitor();

  return (
    <Box className="flex flex-row gap-3 w-1/2 justify-center">
      <Box className="flex flex-col gap-5 bg-violet-300 p-1.5 rounded shadow-xl w-1/2">
        <Typography variant="h4" className="uppercase bg-violet-400" style={{ fontFamily: "inherit", color: "white", fontWeight: "bold", textAlign: "center", padding: "5px" }}>Turno</Typography>
        <Box className="flex flex-col gap-3">
          {
            pendingTickets.length > 0 && pendingTickets.slice(0, 8).reverse().map((ticket, index) => (
              <Typography key={index} variant="h4" style={{ fontFamily: "inherit", fontWeight: "lighter", textAlign: "center", backgroundColor: "white", padding: "5px" }}>
                {ticket.code}
              </Typography>
            )
            )
          }
          {
            takenTickets.length > 0 ? takenTickets.map((ticket, index) => (
              <Typography key={index} variant="h3" className={`${(ticketRecalled[ticket.id] && idTicketRecalled[ticket.id]) ? "flash-animation" : "bg-violet-600"}`} style={{ fontFamily: "inherit", fontWeight: "bold", textAlign: "center", color: "white", padding: "5px" }}>
                {ticket.code}
              </Typography>
            )
            ) : pendingTickets.length === 0 && takenTickets.length === 0 ?
              <Typography variant="h6" style={{ fontFamily: "inherit", fontWeight: "bold", textAlign: "center", backgroundColor: "red", color: "white", padding: "5px" }}>
                No hay turnos pendientes
              </Typography>
              : <Typography></Typography>
          }
        </Box>
      </Box>
      <Box className="flex flex-col gap-5 bg-violet-300  p-1.5 rounded shadow-xl w-1/2">
        <Typography variant="h4" className="uppercase bg-violet-400" style={{ fontFamily: "inherit", color: "white", fontWeight: "bold", textAlign: "center", padding: "5px" }}>Box</Typography>
        <Box className="flex flex-col gap-3">
          {
            pendingTickets.length > 0 && pendingTickets.slice(0, 8).reverse().map((ticket, index) => (
              <Typography key={index} variant="h4" style={{ fontFamily: "inherit", fontWeight: "lighter", textAlign: "center", backgroundColor: "white", padding: "5px" }}>
                {ticket.box?.name || " - "}
              </Typography>
            )
            )
          }
          {
            takenTickets.length > 0 ? takenTickets.map((ticket, index) => (
              <Typography key={index} variant="h3" className={`${(ticketRecalled[ticket.id] && idTicketRecalled[ticket.id]) ? "flash-animation" : "bg-violet-600"}`} style={{ fontFamily: "inherit", fontWeight: "bold", textAlign: "center", color: "white", padding: "5px" }}>
                {ticket.box?.name}
              </Typography>
            )
            ) : pendingTickets.length === 0 && takenTickets.length === 0 ?
              <Typography variant="h6" style={{fontFamily: "inherit",  fontWeight: "bold", textAlign: "center", backgroundColor: "red", color: "white", padding: "5px" }}>
                No hay turnos pendientes
              </Typography>
              : <Typography></Typography>
          }
        </Box>
      </Box>
    </Box>
  );
};

export default AttentionList;
