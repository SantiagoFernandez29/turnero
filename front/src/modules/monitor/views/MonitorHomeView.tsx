import { Box } from "@mui/material";
import AttentionBox from "../components/AttentionBox";


const MonitorHomeView = () => {
    return (
        <Box className= "flex flex-row items-top justify-center">
            <div>
                <AttentionBox />
            </div>
        </Box>
    );
};

export default MonitorHomeView;