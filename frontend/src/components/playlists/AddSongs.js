import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../StyledComponents";
import SongSearch from "./SongSearch";

export default function AddSongs() {
    const navigate = useNavigate();

    const content = () => {
        return <p>content</p>
    }

    return (
        <SongSearch
            title="search"
            content={content()}
            done={<PrimaryButton>Done</PrimaryButton>}
            onDismiss={() => navigate("/playlist/62d5727164be763d0d02bb94")}
        />
    );
}
