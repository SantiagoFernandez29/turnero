import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import useBackoffice from "../hooks/use-backoffice";
import PATHS from "../../../configs/constants/paths";
import { useEffect } from "react";

const BackofficeHomeView = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const {
    // totalPendingTickets,
    // boxPendingTickets,
    // ticketInService,
    pendingTickets,
    takenTickets,
    handleCallTicket,
    // handleSetTicketInService,
    handleFinishTicket,
    handleReiterateTicket,
  } = useBackoffice(id ? { id } : { id: "" });

  // console.log(totalPendingTickets);

    useEffect(() => {
      if (localStorage.getItem("box") === null || localStorage.getItem("box") !== id) navigate(PATHS.BACKOFFICE.HOME);
    }, []);

  return (
    <Box className="flex flex-col items-center gap-10 m-5 w-full">
      <Typography variant="h5" className="text-center" style={{ fontWeight: "bold" }}>
        Backoffice Home View - Box <span className="text-purple-700">{id}</span>
      </Typography>
      <Box className="flex flex-row place-content-between w-full">
        <Box className="flex flex-col gap-5 bg-indigo-200 p-8 border-2 border-indigo-300 rounded-lg shadow-lg">
          <Typography variant="h4" className="uppercase text-center" style={{ fontWeight: "bold" }}>Pendientes</Typography>
          <Box className=" flex flex-col gap-10">
            {pendingTickets.length >= 1 &&
              pendingTickets.slice(0, 5).map((ticket, index) => (
                <Box
                  key={index}
                  className={index === 0 ? "flex flex-row items-center justify-between bg-lime-300 p-2 rounded-lg shadow-lg w-" : "flex flex-row items-center justify-between bg-indigo-100 p-2 rounded-lg shadow-lg"}
                >
                  <Typography
                    key={index}
                    style={index === 0 ? { fontWeight: "bold", color: "green" } : { fontWeight: "lighter" }}
                  >
                    {ticket.code}
                  </Typography>
                  <Button
                    variant="contained"
                    color={index === 0 ? "success" : "primary"}
                    style={{ fontWeight: "bold" }}
                    onClick={() => handleCallTicket(ticket)}
                  >
                    Llamar
                  </Button>
                </Box>
              ))}
            {pendingTickets.length === 0 &&
              <Typography className="text-center" style={{ fontWeight: "lighter", color: "red" }}>
                No hay tickets pendientes
              </Typography>
            }
          </Box>
        </Box>
        {/* <Box className="flex flex-col gap-5 bg-indigo-200 p-8 border-2 border-indigo-300 rounded-lg shadow-lg">
          <Typography variant="h4" className="uppercase text-center" style={{ fontWeight: "bold" }}>Llamar</Typography>
          <Box className=" flex flex-col gap-10 items-center">
            {boxPendingTickets.length >= 1 &&
              boxPendingTickets.slice(0, 5).map((ticket, index) => (
                <Box
                  key={index}
                  className={index === 0 ? "flex flex-row items-center justify-between bg-lime-300 p-2 rounded-lg shadow-lg w-auto gap-4" : "flex flex-row items-center justify-between bg-indigo-100 p-2 rounded-lg shadow-lg w-3/4"}
                >
                  <Typography
                    key={index}
                    style={index === 0 ? { fontWeight: "bold", color: "green" } : { fontWeight: "lighter" }}
                  >
                    {ticket.turn}
                  </Typography>
                  <Button
                    variant="contained"
                    color={index === 0 ? "success" : "primary"}
                    style={{ fontWeight: "bold" }}
                    onClick={() => handleSetTicketInService(ticket)}
                  >
                    Atender
                  </Button>
                  {index === 0 && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleReiterateTicket()}
                    >
                      Reiterar
                    </Button>
                  )}
                </Box>
              ))}
          </Box>
        </Box> */}
        <Box className="flex flex-col gap-5 bg-indigo-200 p-8 border-2 border-indigo-300 rounded-lg shadow-lg">
          <Typography variant="h4" className="uppercase text-center" style={{ fontWeight: "bold" }}>Recibido</Typography>
          <Box className="flex flex-col gap-10">
            {takenTickets.length > 0 ? (
              <Box className="flex flex-col gap-5">
                <Box className="flex flex-row items-center justify-between bg-red-400 p-2 rounded-lg shadow-lg gap-4">
                  <Typography style={{ fontWeight: "bold", color: "red" }}>
                    {takenTickets[0]?.code}
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ fontWeight: "bold" }}
                    onClick={() => handleFinishTicket(takenTickets[0])}
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
                <Box className="flex flex-col gap-3 bg-slate-50 p-2 rounded-lg shadow-lg">
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>Turno: {takenTickets[0]?.code}</Typography>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>Área: {takenTickets[0]?.area}</Typography>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>Fecha: {takenTickets[0]?.takenAt}</Typography>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>Cantidad de espera: {0}</Typography>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>Voucher: {0}</Typography>
                </Box>
              </Box>
            ) : (
              <Typography className="text-center" style={{ fontWeight: "lighter", color: "red" }}>
                No hay tickets en servicio
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BackofficeHomeView;
