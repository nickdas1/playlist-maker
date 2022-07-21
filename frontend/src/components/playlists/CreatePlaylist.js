import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    InfoBox,
    InfoContainer,
    InfoInput,
    PrimaryButton,
} from "../StyledComponents";

export default function CreatePlaylist() {
    const navigate = useNavigate();

    const createPlaylist = async () => {
        const response = await axios.post("/api/playlist/create", {
            songs: [
                {
                    name: "Views"
                }
            ]
        });
        navigate(`/playlist/${response.data.insertedId}`);
    };

    return (
        <InfoContainer>
            <InfoBox>
                <InfoInput placeholder="Playlist Name" disableUnderline />
                <PrimaryButton onClick={createPlaylist}>
                    Create Playlist
                </PrimaryButton>
            </InfoBox>
        </InfoContainer>
    );
}

// convert to redux
// copy authReducer, create, edit, delete from StreamR
// Figure out how to send user input as req.body instead of test

// 1. add songs button
// 2. search modal pops up
// 3. modal searches db, button to add song
// 4. create playlist button - redirects to /playlist/id
