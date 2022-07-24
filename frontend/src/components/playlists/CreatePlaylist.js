import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";

export default function CreatePlaylist() {
    const [playlistName, setPlaylistName] = useState('');
    const navigate = useNavigate();

    const createPlaylist = async () => {
        const response = await axios.post("/api/playlist/create", {
            name: playlistName,
            songs: [],
            user: 'Nick'
        });
        navigate(`/playlist/${response.data.insertedId}`);
    };

    return (
        <InfoContainer>
            <InfoBox>
                <InfoInput placeholder="Playlist Name" disableUnderline onChange={e => setPlaylistName(e.target.value)} />
                <PrimaryButton onClick={createPlaylist}>
                    Create Playlist
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
