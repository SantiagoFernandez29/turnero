import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";


const Time = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box className="flex flex-col bg-violet-200 rounded-lg items-center w-full p-2">
            <Box className="flex flex-col w-full items-center">
                <Typography variant="h3" style={{ fontWeight: "lighter", fontFamily: "inherit", textAlign: "center" }} className="w-fit">
                    {time.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                    })}
                </Typography>
                <Typography variant="h1" style={{ fontWeight: "normal", fontFamily: "inherit", textAlign: "center", color: "blueviolet" }} className="w-full bg-violet-300 rounded-lg ">
                    {time.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                    }
                    )}
                </Typography>
            </Box>
        </Box>
    )
}

export default Time;