import { Box } from "@mui/material";
import AttentionBox from "../components/Box";


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