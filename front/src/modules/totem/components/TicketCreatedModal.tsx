import { Box, Modal, Skeleton, Typography } from "@mui/material";
import { Ticket } from "../../shared/components/models/ticket";
import { Procedure } from "../models/procedure";
import { useEffect, useState } from "react";

interface TicketCreatedModalProps {
    ticket?: Ticket;
    tramite?: Procedure;
    openModal: boolean;
    isLoading: boolean;
    setOpenModal: (open: boolean) => void;
    setShowHomeView: (showHomeView: boolean) => void;
}

const TicketCreatedModal = ({ ticket, tramite, openModal, isLoading, setOpenModal, setShowHomeView }: TicketCreatedModalProps) => {

    const [timer, setTimer] = useState<number>(10);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setShowHomeView(true);
    //         setOpenModal(false);
    //     }, 10000);

    //     return () => clearInterval(interval);
    // }, [setOpenModal, setShowHomeView]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer >= 0 && openModal) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setShowHomeView(true);
            setOpenModal(false);
            setTimer(10);
        }

        return () => clearInterval(interval);
    }, [setOpenModal, setShowHomeView, timer, openModal]);

    return (
        <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            style={{ backdropFilter: "blur(5px)" }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "45%",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 4,
                    p: 4,
                }}
                className="flex flex-col gap-3 items-center"
            >
                {
                    !isLoading ? (
                        <Typography id="modal-modal-title" variant="h5" component="h1" style={{ textAlign: "center", fontFamily: "inherit", fontWeight: "initial" }}>
                            Seleccionó el trámite <span style={{ color: "purple", fontWeight: "bold" }}>{tramite?.name}</span>.
                        </Typography>
                    ) : (
                        <Skeleton variant="text" width="100%" />
                    )
                }
                {
                    !isLoading ? (
                        <Typography variant="h1" style={{ textAlign: "center", fontFamily: "inherit", fontWeight: "initial" }}>
                            <span style={{ color: "purple", fontWeight: "bold" }}>{ticket?.code}</span>
                        </Typography>
                    ) : (
                        <Skeleton variant="text" width="100%" />
                    )
                }
                {
                    !isLoading ? (
                        <Typography variant="h5" style={{ textAlign: "center", fontFamily: "inherit", fontWeight: "initial" }}>
                            Por favor, retire su ticket y espere a ser llamado.
                        </Typography>
                    ) : (
                        <Skeleton variant="text" width="100%" />
                    )
                }
            </Box>
        </Modal>
    )
}

export default TicketCreatedModal;