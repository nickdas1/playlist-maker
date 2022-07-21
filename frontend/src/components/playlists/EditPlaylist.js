import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";

export default function EditPlaylist() {
    const { id } = useParams();

    const navigate = useNavigate();

    const editPlaylist = async () => {
        const response = await axios.patch(`/api/playlist/${id}/edit`, {
            songs: [{ name: "song1" }, { name: "song2" }, { name: "song3" }],
        });
    };

    return (
        <InfoContainer>
            <InfoBox>
                <InfoInput placeholder="Playlist Name" disableUnderline />
                <PrimaryButton onClick={editPlaylist}>
                    Edit Playlist
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}
