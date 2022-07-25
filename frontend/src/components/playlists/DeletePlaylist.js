import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { DangerButton, PrimaryButton } from "../StyledComponents";
import PlaylistActionModal from "./PlaylistActionModal";

export default function DeletePlaylist() {
    const { id: playlistId } = useParams();

    const navigate = useNavigate();

    const deletePlaylist = async () => {
        await axios.delete(`/api/playlist/${playlistId}/delete`);
        navigate("/");
    };

    const actions = (
        <>
            <DangerButton
                variant="contained"
                color="error"
                onClick={deletePlaylist}
            >
                Delete Playlist
            </DangerButton>
            <Link to={`/playlist/${playlistId}`}>
                <PrimaryButton color="primary">Cancel</PrimaryButton>
            </Link>
        </>
    );

    const renderContent = () => {
        return (
            <div>
                <span style={{ color: "white" }}>
                    Are you sure you want to delete this playlist?
                </span>
            </div>
        );
    };

    return (
        <PlaylistActionModal
            header="Delete Playlist"
            content={renderContent()}
            actions={actions}
            onDismiss={() => navigate(`/playlist/${playlistId}`)}
            height="20vh"
        />
    );
}
