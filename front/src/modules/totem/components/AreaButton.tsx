import { Box } from "@mui/material";
import { AreaButtonDto } from "../dto/area-button";
import LoadingButton from "../../shared/components/ui/loading-button";


const AreaButton = ({ title, onClick, style, isLoading }: AreaButtonDto) => {
  return (
    <Box component={"button"}>
      <LoadingButton style={style} variant="contained" color="secondary" size="large" fullWidth onClick={onClick} disabled={isLoading} isLoading={false}>
        {title}
      </LoadingButton>
    </Box>
  );
};

export default AreaButton;
