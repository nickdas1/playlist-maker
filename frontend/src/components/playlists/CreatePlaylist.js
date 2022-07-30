import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { useUser } from "../../auth/useUser";
import { createPlaylist } from "../../actions";


export default function CreatePlaylist() {
    const dispatch = useDispatch();
    const user = useUser();
    const { isVerified } = user;

    const [playlistName, setPlaylistName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showErrorMessage]);

    const onCreatePlaylist = async () => {
        if (!playlistName) {
            setErrorMsg("You must enter a playlist name!");
            setShowErrorMessage(true);
            return;
        }
        try {
            dispatch(createPlaylist({
                name: playlistName,
                songs: [],
                user: user.email,
                username: user.username,
                isVerified,
            }));
        } catch (e) {
            setErrorMsg(e.response.data.message);
        }
    };

    return (
        <InfoContainer>
            <InfoBox sx={{ height: "25vh" }}>
                {showErrorMessage && <Box className="fail">{errorMsg}</Box>}
                {!isVerified && (
                    <Box className="fail">
                        You won't be able to create a playlist until you verify
                        your email
                    </Box>
                )}
                <InfoInput
                    placeholder="Playlist Name"
                    disableUnderline
                    onChange={(e) => setPlaylistName(e.target.value)}
                />
                <PrimaryButton onClick={onCreatePlaylist} variant="outlined">
                    Create Playlist
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
