import { Box, Typography } from "@mui/material";
import AttentionList from "../components/AttentionList";
import VideoDisplayer from "../components/VideoDisplayer";
import Time from "../components/Time";

const MonitorHomeView = () => {
    return (
        <Box className="flex flex-row items-top place-content-between w-full">
            <AttentionList />
            <Box className="flex flex-col place-items-center h-full w-1/2 px-2">
                <VideoDisplayer />
                <Box className="flex flex-col h-1/2 place-content-evenly">
                    <Time />
                    <Typography variant="h4" style={{ fontWeight: "lighter", fontFamily: "inherit", textAlign: "center" }}> Por favor, mantenga su DNI a mano al momento de ser atendido. </Typography>
                    <Box className="flex flex-row w-full place-content-end">
                        <img src="/assets/images/municipalidad_de_campana_logo.jpg" alt="Logo" className="rounded-sm w-1/5 h-full object-cover" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MonitorHomeView;