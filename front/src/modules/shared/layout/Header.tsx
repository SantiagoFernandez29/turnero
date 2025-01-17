import { Box, Button } from "@mui/material"
import { LogOut } from "lucide-react"
import useAuth from "../../auth/hooks/use-auth"
import { useEffect, useState } from "react"


const Header = () => {

    const { logout, user } = useAuth()

    const terminalType = user?.terminalType
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        if (event.clientY < 50) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener("mousemove", handleMouseMove);
  
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    return (
        <Box className={`bg-violet-300 w-full flex flex-col place-items-end transition-all duration-300 absolute top-0 ${(terminalType !== "box" && isVisible) ? "opacity-100" : "opacity-0 "}`}>
            <Button variant="text" color="secondary" onClick={logout} style={{ fontWeight: "bold", fontFamily: "inherit" }}>
                <LogOut className="mx-2"/> Salir
            </Button>
        </Box>
    )
}

export default Header