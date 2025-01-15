import { Box } from "@mui/material";
import AttentionList from "../components/AttentionList";
import VideoDisplayer from "../components/VideoDisplayer";


const MonitorHomeView = () => {
    return (
        <Box className="flex flex-row items-top place-content-between w-full">
            <AttentionList />
            <VideoDisplayer />
        </Box>
    );
};

export default MonitorHomeView;