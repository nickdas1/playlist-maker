import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { DangerButton, PrimaryButton } from "../StyledComponents";
import PlaylistActionModal from "./PlaylistActionModal";
import { useToken } from "../../auth/useToken";
import { deletePlaylist } from "../../actions";

export default function DeletePlaylist() {
    const [token] = useToken();
    const { id: playlistId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showErrorMessage]);

    const onDeletePlaylist = () => {
        dispatch(deletePlaylist(playlistId, token)).catch(e => {
            setShowErrorMessage(true);
        });
    };

    const actions = (
        <>
            <DangerButton
                variant="contained"
                color="error"
                onClick={onDeletePlaylist}
            >
                Delete Playlist
            </DangerButton>
            <Link to={`/playlist/${playlistId}`}>
                <PrimaryButton>Cancel</PrimaryButton>
            </Link>
        </>
    );

    const renderContent = () => {
        return (
            <Box>
                {showErrorMessage && (
                    <Box className="fail">
                        Something went wrong and we couldn't delete the
                        playlist. Please try again later.
                    </Box>
                )}
                <span style={{ color: "white" }}>
                    Are you sure you want to delete this playlist?
                </span>
            </Box>
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
