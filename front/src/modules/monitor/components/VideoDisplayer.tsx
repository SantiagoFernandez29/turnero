import { Box } from "@mui/material";

const PLAYLIST_ID = "PLMijrL4hs5kga4GRDM08bF-YBEddfJxng";

const VideoDisplayer = () => {
    return (
        <Box className="h-1/2">
            <iframe
                width="620"
                height="349"
                src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&autoplay=1&mute=1&controls=0&loop=1&cc_load_policy=0`}
                title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="rounded-lg"
            />
        </Box>
    )
};

export default VideoDisplayer;