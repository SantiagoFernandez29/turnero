import { Box, Button } from "@mui/material";
import { AreaButtonDto } from "../dto/area-button";


const AreaButton = ({ title, onClick }: AreaButtonDto) => {
  return (
    <Box component={"button"}>
      <Button variant="contained" color="secondary" size="large" fullWidth onClick={onClick}>
        {title}
      </Button>
    </Box>
  );
};

export default AreaButton;
