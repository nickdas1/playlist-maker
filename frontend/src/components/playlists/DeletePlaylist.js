import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box } from "@mui/material";
import { PrimaryButton } from "../StyledComponents";
import PlaylistActionModal from "./PlaylistActionModal";
import { useToken } from "../../auth/useToken";
import NotificationContext from "../../contexts/NotificationContext";

export default function DeletePlaylist() {
    const [token] = useToken();
    const { id: playlistId } = useParams();

    const { setNotificationStatus } = useContext(NotificationContext);

    const navigate = useNavigate();

    const deletePlaylist = async () => {
        try {
            await axios.delete(`/api/playlist/${playlistId}/delete`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/");
        } catch (e) {
            setNotificationStatus({
                isActive: true,
                message:
                    "Something went wrong and we couldn't delete the playlist. Please try again later.",
                severity: "error",
            });
        }
    };

    const actions = (
        <>
            <PrimaryButton
                variant="contained"
                color="error"
                onClick={deletePlaylist}
            >
                Delete Playlist
            </PrimaryButton>
            <Link to={`/playlist/${playlistId}`}>
                <PrimaryButton>Cancel</PrimaryButton>
            </Link>
        </>
    );

    const renderContent = () => {
        return (
            <Box>
                <span style={{ color: "white" }}>
                    Are you sure you want to delete this playlist?
                </span>
            </Box>
        );
    };

    return (
        <>
            <PlaylistActionModal
                header="Delete Playlist"
                content={renderContent()}
                actions={actions}
                onDismiss={() => navigate(`/playlist/${playlistId}`)}
                height="20vh"
            />
        </>
    );
}
