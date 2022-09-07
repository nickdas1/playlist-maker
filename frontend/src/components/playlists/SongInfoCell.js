import { useContext } from "react";
import { Box, Tooltip } from "@mui/material";
import NotificationContext from "../../contexts/NotificationContext";
import { Cell } from "../StyledComponents";

export default function SongInfoCell({ song, setAudioSource }) {
    const { setNotificationStatus } = useContext(NotificationContext);

    return (
        <Cell
            sx={{
                borderBottom: "none",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Tooltip title="Click to Preview">
                <img
                    src={song.album.images[2].url}
                    className="album-cover"
                    alt={song.album.title}
                    onClick={() => {
                        if (!song.preview_url) {
                            setNotificationStatus({
                                isActive: true,
                                message: "Song preview is unavailable.",
                                severity: "error",
                            });
                        }
                        setAudioSource(song.preview_url);
                    }}
                />
            </Tooltip>
            <Box>
                {song.name}
                <p className="artists">{song.artists[0].name}</p>
            </Box>
        </Cell>
    );
}
