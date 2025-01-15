import { Box } from "@mui/material";


const VideoDisplayer = () => {
    return(
        // cambiar el iframe por un video
        <Box>
            {/* <video id="video" loop autoPlay muted width="100%" height="100%">
                <source src="https://www.youtube.com/watch?v=iX9e0XrfjUo"/>
            </video> */}
            <iframe width="620" height="420" src="https://www.youtube.com/embed/iX9e0XrfjUo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="rounded-lg" ></iframe>
        </Box>
    )
};

export default VideoDisplayer;