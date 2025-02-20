import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import useBackoffice from "../hooks/use-backoffice";
import PATHS from "../../../configs/constants/paths";
import { useEffect } from "react";
import LoadingButton from "../../shared/components/ui/loading-button";
import useAuth from "../../auth/hooks/use-auth";
import PipListDisplayer from "../components/PipListDisplayer";

const BackofficeHomeView = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const boxItem = localStorage.getItem("box");
  const box = boxItem && JSON.parse(boxItem);

  const { user } = useAuth();

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
    if (box === null || (box.id !== Number(id))) {
      localStorage.removeItem("box");
      navigate(PATHS.BACKOFFICE.HOME);
    }
  }, []);

  const formatDocument = (doc: string) => {
    if (doc.length <= 2) return doc;
    if (doc.length <= 5) return `${doc.slice(0, 2)}.${doc.slice(2)}`;
    return `${doc.slice(0, 2)}.${doc.slice(2, 5)}.${doc.slice(5)}`;
};

  return (
    <Box className="flex flex-col gap-10 m-5 w-full">
      <Box className="flex flex-row justify-between w-full mt-2">
        <Typography variant="h5" className="text-center" style={{ fontWeight: "bold", fontFamily: "inherit" }}>
          Backoffice Home View - Box <span className="text-purple-700">{id}</span>
        </Typography>
        <Typography variant="h5" className="text-center" style={{ fontWeight: "bold", fontFamily: "inherit" }}>
          <span className="text-purple-700">{user?.username}</span>
        </Typography>
      </Box>
      <Box className="flex flex-row place-content-evenly w-full">
        <Box className="flex flex-col gap-5 bg-violet-200 p-8 rounded-lg shadow-lg">
          <Typography variant="h4" className="uppercase text-center" style={{ fontWeight: "bold", fontFamily: "inherit" }}>Pendientes</Typography>
          <Box className=" flex flex-col gap-10">
            {pendingTickets.length > 0 && <PipListDisplayer pendingTickets={pendingTickets} />}
            {pendingTickets.length >= 1 &&
              pendingTickets.slice(0, 5).map((ticket, index) => (
                <Box
                  key={index}
                  className={index === 0 ? "flex flex-row items-center justify-between bg-lime-300 p-2 rounded-lg shadow-lg w-" : "flex flex-row items-center justify-between bg-indigo-100 p-2 rounded-lg shadow-lg"}
                >
                  <Typography
                    key={index}
                    style={index === 0 ? { fontWeight: "bold", color: "green", fontFamily: "inherit" } : { fontWeight: "lighter", fontFamily: "inherit" }}
                  >
                    {ticket.code}
                  </Typography>
                  <LoadingButton
                    variant="contained"
                    color={index === 0 ? "success" : "primary"}
                    style={index !== 0 ? { display: "none" } : { fontWeight: "bold" }}
                    onClick={() => handleCallTicket(ticket)}
                    isLoading={isLoading["CALL"]}
                    disabled={takenTickets.length > 0 || isLoading["CALL"]}
                  >
                    Llamar
                  </LoadingButton>
                </Box>
              ))}
            {pendingTickets.length === 0 &&
              <Typography className="text-center" style={{ fontWeight: "bold", color: "red", fontFamily: "inherit" }}>
                No hay tickets pendientes
              </Typography>
            }
          </Box>
        </Box>
        <Box className="flex flex-col gap-5 bg-violet-200 p-8 rounded-lg shadow-lg">
          <Typography variant="h4" className="uppercase text-center" style={{ fontWeight: "bold", fontFamily: "inherit"  }}>Recibido</Typography>
          <Box className="flex flex-col gap-10">
            {takenTickets.length > 0 ? (
              <Box className="flex flex-col gap-5">
                <Box className="flex flex-row items-center justify-between bg-red-400 p-2 rounded-lg shadow-lg gap-4">
                  <Typography style={{ fontWeight: "bold", color: "red", fontFamily: "inherit" }}>
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
                    style={{ fontWeight: "bold" }}
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
                <Box className="flex flex-col bg-slate-50 p-2 rounded-lg shadow-lg">
                  <Box className="flex flex-row items-center justify-between">
                    <Typography variant="h6" style={{ fontWeight: "bold", fontFamily: "inherit", color: takenTickets[0]?.prioritary ? "green" : "black" }}>{takenTickets[0]?.code}</Typography>
                    <Typography variant="h6" style={{ fontWeight: "bold", fontFamily: "inherit", color: "indigo" }}>{takenTickets[0]?.procedure}</Typography>
                  </Box>
                  {takenTickets[0]?.citizenName && takenTickets[0]?.citizenSurname && <Typography variant="h6" style={{ fontWeight: "bold", fontFamily: "inherit" }}>{takenTickets[0]?.citizenSurname}, {takenTickets[0]?.citizenName}</Typography>}
                  {takenTickets[0]?.document !== null && <Typography variant="h6" style={{ fontWeight: "bold", fontFamily: "inherit" }}>{formatDocument(String(takenTickets[0]?.document))}</Typography>}
                  <Typography variant="h6" style={{ fontWeight: "bold", fontFamily: "inherit" }}>Creación: {takenTickets[0].createdAt && `${new Date(takenTickets[0].createdAt).toLocaleDateString('ES-es', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}</Typography>
                  <Typography variant="h6" style={{ fontWeight: "bold", fontFamily: "inherit" }}>Llamado: {takenTickets[0].takenAt && `${new Date(takenTickets[0].takenAt).toLocaleDateString('ES-es', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}</Typography>
                </Box>
              </Box>
            ) : (
              <Typography className="text-center" style={{ fontWeight: "bold", color: "red", fontFamily: "inherit" }}>
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
