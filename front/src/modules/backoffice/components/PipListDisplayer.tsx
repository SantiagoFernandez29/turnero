import { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom/client';
import { Ticket } from "../../shared/components/models/ticket";
import { Box, Typography } from "@mui/material";

interface PipListDisplayerProps {
    pendingTickets: Ticket[];
}

const PipListDisplayer = ({ pendingTickets }: PipListDisplayerProps) => {
    const dpipRef = useRef<any>(null);
    const [pipRoot, setPipRoot] = useState<ReactDOM.Root | null>(null);

    const WindowContents = ({ pendingTickets }: PipListDisplayerProps) => {
        return (
            <Box className="box-1">
                <Typography variant="h2" className="title" style={{ fontFamily: "inherit"}}>Pendientes</Typography>
                <Box className="box-2">
                    {pendingTickets.length >= 1 &&
                        pendingTickets.slice(0, 5).map((ticket, index) => (
                            <Box
                                key={index}
                                className={index === 0 ? "box-3-1 " : "box-3-2"}
                            >
                                <Typography
                                    key={index}
                                    style={index === 0 ? { fontWeight: "bold", color: "green", fontFamily: "inherit" } : { fontWeight: "lighter", fontFamily: "inherit" }}
                                >
                                    {ticket.code}
                                </Typography>
                            </Box>
                        ))}
                    {pendingTickets.length === 0 &&
                        <Typography className="title" style={{ fontWeight: "bold", color: "red", fontFamily: "inherit" }}>
                            No hay tickets pendientes
                        </Typography>
                    }
                </Box>
            </Box>
        )
    }

    const openWindow = async () => {
        try {
            const dpip = await window.documentPictureInPicture.requestWindow({
                width: "500",
                height: "500",
            });
            dpipRef.current = dpip;
            const pipDiv = dpip.document.createElement("div");
            pipDiv.setAttribute("id", "pip-root");
            dpip.document.body.append(pipDiv);

            const link = dpip.document.createElement("link");
            link.rel = "stylesheet";
            link.href = "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;700&display=swap";
            dpip.document.head.append(link);

            const style = dpip.document.createElement("style");
            style.textContent = `
                body {
                    margin: 0;
                    font-family: 'Quicksand', sans-serif;
                }
                .box-1 {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    background-color: #E0BBE4;
                    padding: 1rem;
                    margin: 1rem;
                    border-radius: 0.5rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    }
                .title {
                    font-weight: bold;
                    text-align: center;
                    text-transform: uppercase;
                }
                .box-2 {
                    display: flex;
                    flex-direction: column;
                    gap: 2.5rem;
                }
                .box-3-1 {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    background-color: #D4E157;
                    padding: 0.5rem; /* p-2 */
                    border-radius: 0.5rem; /* rounded-lg */
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
                }
                .box-3-2 {
                    display: flex; /* flex */
                    flex-direction: row; /* flex-row */
                    align-items: center; /* items-center */
                    justify-content: space-between; /* justify-between */
                    background-color: #C5CAE9; /* bg-indigo-100 */
                    padding: 0.5rem; /* p-2 */
                    border-radius: 0.5rem; /* rounded-lg */
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
                }
            `;
            dpip.document.head.append(style);
            const root = ReactDOM.createRoot(
                dpip.document.getElementById("pip-root") as HTMLElement
            );
            setPipRoot(root);
            root.render(<WindowContents pendingTickets={pendingTickets} />);
        } catch (error) {
            if (error) {
                console.log(error);
            }
        }
    }

    const closeWindow = () => {
        if (dpipRef.current) {
            dpipRef.current.close();
            dpipRef.current = null;
        }
    }

    useEffect(() => {
        const handleBlur = () => {
            openWindow();
        };

        const handleFocus = () => {
            closeWindow();
        };

        window.addEventListener('blur', handleBlur);
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    useEffect(() => {
        if (pipRoot) {
            pipRoot.render(<WindowContents pendingTickets={pendingTickets} />);
        }
    }, [pendingTickets, pipRoot]);

    return <></>
}

export default PipListDisplayer;