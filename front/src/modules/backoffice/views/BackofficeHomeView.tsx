import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import useBackoffice from "../hooks/use-backoffice";
import PATHS from "../../../configs/constants/paths";
import { useEffect } from "react";
import LoadingButton from "../../shared/components/ui/loading-button";
import useAuth from "../../auth/hooks/use-auth";

const BackofficeHomeView = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const boxItem = localStorage.getItem("box");
  const box = boxItem && JSON.parse(boxItem);

  const { user } = useAuth();

  // console.log("user", user);
  
  const {
    pendingTickets,
    takenTickets,
    ticketRecalled,
    timer,
    isLoading,
    handleCallTicket,
    handleFinishTicket,
    handleReiterateTicket,
  } = useBackoffice(box?.id);
  
  useEffect(() => {
    if (box === null || ( box.id !== Number(id))) {
      localStorage.removeItem("box");
      navigate(PATHS.BACKOFFICE.HOME);
    }
  }, []);

  return (
    <Box className="flex flex-col items-center gap-10 m-5 w-full">
      <Box className="flex flex-row justify-between w-full mt-2">
      <Typography variant="h5" className="text-center" style={{ fontWeight: "bold", fontFamily: "inherit" }}>
        Backoffice Home View - Box <span className="text-purple-700">{id}</span>
      </Typography>
      <Typography variant="h5" className="text-center" style={{ fontWeight: "bold", fontFamily: "inherit" }}>
        <span className="text-purple-700">{user?.username}</span>
      </Typography>
      </Box>
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
                  <LoadingButton
                    variant="contained"
                    color={index === 0 ? "success" : "primary"}
                    style={ index !== 0 ? { display: "none"} : { fontWeight: "bold" }}
                    onClick={() => handleCallTicket(ticket)}
                    isLoading={isLoading["CALL"]}
                    disabled={takenTickets.length > 0 || isLoading["CALL"]}
                  >
                    Llamar
                  </LoadingButton>
                </Box>
              ))}
            {pendingTickets.length === 0 &&
              <Typography className="text-center" style={{ fontWeight: "lighter", color: "red" }}>
                No hay tickets pendientes
              </Typography>
            }
          </Box>
        </Box>
        <Box className="flex flex-col gap-5 bg-indigo-200 p-8 border-2 border-indigo-300 rounded-lg shadow-lg">
          <Typography variant="h4" className="uppercase text-center" style={{ fontWeight: "bold" }}>Recibido</Typography>
          <Box className="flex flex-col gap-10">
            {takenTickets.length > 0 ? (
              <Box className="flex flex-col gap-5">
                <Box className="flex flex-row items-center justify-between bg-red-400 p-2 rounded-lg shadow-lg gap-4">
                  <Typography style={{ fontWeight: "bold", color: "red" }}>
                    {takenTickets[0]?.code}
                  </Typography>
                  <LoadingButton
                    variant="contained"
                    color="error"
                    style={{ fontWeight: "bold" }}
                    onClick={() => handleFinishTicket(takenTickets[0].id, "FINISH")}
                    isLoading={isLoading["FINISH"]}
                    disabled={ticketRecalled || isLoading["CANCEL"] || isLoading["FINISH"]}
                  >
                    Finalizar
                  </LoadingButton>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleReiterateTicket(takenTickets[0].id)}
                    disabled={ticketRecalled || isLoading["CANCEL"] || isLoading["FINISH"]}
                  >
                    {ticketRecalled ? `${timer}` : "Reiterar"}
                  </Button>
                  <LoadingButton
                    variant="contained"
                    color="error"
                    style={{ fontWeight: "bold" }}
                    onClick={() => handleFinishTicket(takenTickets[0].id, "CANCEL")}
                    isLoading={isLoading["CANCEL"]}
                    disabled={ticketRecalled || isLoading["CANCEL"] || isLoading["FINISH"]}
                  >
                    Cancelar
                  </LoadingButton>
                </Box>
                <Box className="flex flex-col gap-3 bg-slate-50 p-2 rounded-lg shadow-lg">
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>Turno: {takenTickets[0]?.code}</Typography>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>Área: {takenTickets[0]?.areaId}</Typography>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>Fecha: {`${new Date(takenTickets[0]?.takenAt).toLocaleDateString('ES-es', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}</Typography>
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
