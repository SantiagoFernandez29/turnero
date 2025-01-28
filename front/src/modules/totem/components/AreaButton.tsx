import { Box } from "@mui/material";
import { AreaButtonDto } from "../dto/area-button";
import LoadingButton from "../../shared/components/ui/loading-button";


const AreaButton = ({ title, onClick, isLoading }: AreaButtonDto) => {
  return (
    <Box component={"button"}>
      <LoadingButton variant="contained" color="secondary" size="large" fullWidth onClick={onClick} isLoading={false}>
        {title}
      </LoadingButton>
    </Box>
  );
};

export default AreaButton;
