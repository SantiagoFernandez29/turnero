import { Box, Typography } from "@mui/material";
import { TicketProps } from "../models/ticket";

const Ticket = ({ ticket }: TicketProps) => {
    return(
        <Box className="flex flex-col items-center gap-10 place-content-between m-5">
            <Typography variant="h4" style={{ fontWeight: "lighter", textAlign: "center" }}> Municipalidad de Campana </Typography>
            <Box className="flex flex-col">
                <Typography variant="h6" style={{ fontWeight: "lighter", textAlign: "center" }}> 
                    Su turno es: 
                    {ticket.turn} 
                </Typography>
                <Typography variant="h6" style={{ fontWeight: "lighter", textAlign: "center" }}> {ticket.areaTitle} </Typography>
            </Box>
            <Box className="flex flex-col">
                <Typography variant="h6" style={{ fontWeight: "lighter", textAlign: "center" }}> Emisión: {ticket.emitedDate} </Typography>
                <Typography variant="h6" style={{ fontWeight: "lighter", textAlign: "center" }}> Personas en espera: {ticket.waitingCount} </Typography>
                <Typography variant="h6" style={{ fontWeight: "lighter", textAlign: "center" }}> S.E.U.O. - Comprobante: {ticket.voucher} </Typography>
            </Box>
        </Box>
    )
};

export default Ticket;

export const ticket = `
    Municipalidad de Campana

        su turno es: 
        {ticket.turn}

        {ticket.areaTitle}

    Emisión: {ticket.emitedDate}
    Personas en espera: {ticket.waitingCount}
    S.E.U.O. - Comprobante: {ticket.voucher}
`;