import { useState } from "react";
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
import InfoSnackbar from "../InfoSnackbar";

export default function CreatePlaylist() {
    const user = useUser();
    const { isVerified } = user;

    const [playlistName, setPlaylistName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    const createPlaylist = async () => {
        if (!playlistName) {
            setErrorMessage("You must enter a playlist name!");
            setShowErrorMessage(true);
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
            setShowErrorMessage(true);
            setErrorMessage(e.message);
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
            {showErrorMessage && (
                <InfoSnackbar
                    showMessage={showErrorMessage}
                    setShowMessage={setShowErrorMessage}
                    message={errorMessage}
                />
            )}
        </>
    );
}
