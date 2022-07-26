import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";
import { useUser } from "../../auth/useUser";

export default function CreatePlaylist() {
    const user = useUser();

    const [playlistName, setPlaylistName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 5000);
        }
    }, [showErrorMessage]);

    const createPlaylist = async () => {
        if (!playlistName) {
            setErrorMsg("You must enter a playlist name!");
            setShowErrorMessage(true);
            return;
        };
        const response = await axios.post("/api/playlist/create", {
            name: playlistName,
            songs: [],
            user: user.email,
        });
        navigate(`/playlist/${response.data.insertedId}`);
    };

    return (
        <InfoContainer>
            <InfoBox sx={{height: "20vh"}}>
            {showErrorMessage && (
                    <div className="fail">
                        {errorMsg}
                    </div>
                )}
                <InfoInput
                    placeholder="Playlist Name"
                    disableUnderline
                    onChange={(e) => setPlaylistName(e.target.value)}
                />
                <PrimaryButton
                    onClick={createPlaylist}
                    variant="outlined"
                    color="primary"
                >
                    Create Playlist
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
