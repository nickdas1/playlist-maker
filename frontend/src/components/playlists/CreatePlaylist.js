import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { useUser } from "../../auth/useUser";
import NotificationContext from "../../contexts/NotificationContext";

export default function CreatePlaylist() {
    const user = useUser();
    const { isVerified } = user;

    const [playlistName, setPlaylistName] = useState("");
    const navigate = useNavigate();
    const { setNotificationStatus } = useContext(NotificationContext);

    const createPlaylist = async () => {
        if (!playlistName) {
            setNotificationStatus({
                isActive: true,
                message: "You must enter a playlist name!",
                severity: "error",
            });
            return;
        }
        try {
            const response = await axios.post("/api/playlist/create", {
                name: playlistName,
                songs: [],
                userId: user.id,
                user: user.email,
                username: user.username,
                isVerified,
            });
            navigate(`/playlist/${response.data.insertedId}`);
        } catch (e) {
            setNotificationStatus({
                isActive: true,
                message: e.message,
                severity: "error",
            });
        }
    };

    return (
        <>
            <InfoContainer>
                <InfoBox sx={{ height: "25vh" }}>
                    {!isVerified && (
                        <Box className="fail">
                            You won't be able to create a playlist until you
                            verify your email
                        </Box>
                    )}
                    <InfoInput
                        placeholder="Playlist Name"
                        disableUnderline
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                    <PrimaryButton onClick={createPlaylist} variant="outlined">
                        Create Playlist
                    </PrimaryButton>
                </InfoBox>
            </InfoContainer>
        </>
    );
}
