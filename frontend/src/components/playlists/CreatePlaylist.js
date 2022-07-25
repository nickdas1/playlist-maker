import { useState } from "react";
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

    const navigate = useNavigate();

    const createPlaylist = async () => {
        const response = await axios.post("/api/playlist/create", {
            name: playlistName,
            songs: [],
            user: user.email,
        });
        navigate(`/playlist/${response.data.insertedId}`);
    };

    return (
        <InfoContainer>
            <InfoBox>
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
