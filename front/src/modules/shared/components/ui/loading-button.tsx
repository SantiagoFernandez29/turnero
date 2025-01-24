import { Button, ButtonProps } from "@mui/material";
import { LoaderCircle } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
    isLoading: boolean;
}

const LoadingButton = ({ children, isLoading, ...rest }: LoadingButtonProps) => {
    return (
        <Button disabled={isLoading} {...rest}>
            {isLoading ? <LoaderCircle className='w-4 h-4 animate-spin mr-1' /> : children}
        </Button>
    );
};

export default LoadingButton;