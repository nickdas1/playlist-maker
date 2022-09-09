import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LyricsIcon from "@mui/icons-material/Lyrics";
import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    Cell,
    PrimaryButton,
    PRIMARY_BLUE,
    TableHeadCell,
} from "../StyledComponents";
import { useUser } from "../../auth/useUser";
import { useToken } from "../../auth/useToken";
import NotificationContext from "../../contexts/NotificationContext";
import AudioControls from "./AudioControls";
import PlaylistActionModal from "./PlaylistActionModal";
import SongInfoCell from "./SongInfoCell";

export default function PlaylistView() {
    const [token] = useToken();
    const user = useUser();
    const { id: playlistId } = useParams();
    const navigate = useNavigate();

    const [playlistData, setPlaylistData] = useState({});
    const [audioSource, setAudioSource] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [lyrics, setLyrics] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { setNotificationStatus } = useContext(NotificationContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`/api/playlist/${playlistId}`);
                setPlaylistData(...response.data);
            } catch (e) {
                setNotificationStatus({
                    isActive: true,
                    message: "Invalid Playlist ID",
                    severity: "error",
                });
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }
        };
        getData();
    }, [playlistId, navigate, setNotificationStatus]);

    const columns = [
        { id: "number", label: "#" },
        { id: "title", label: "Title", width: "30%" },
        {
            id: "album",
            label: "Album",
            align: "left",
            width: "20%",
        },
        {
            id: "date",
            label: "Date Added",
            align: "left",
        },
        {
            id: "length",
            label: "Length",
            align: "left",
        },
        {
            id: "lyrics",
            label: "Lyrics",
            align: "left",
        },
    ];

    const convertDuration = (ms) => {
        let seconds = ms / 1000;
        let hours = parseInt(seconds / 3600);
        seconds = seconds % 3600;
        let minutes = parseInt(seconds / 60);
        seconds = (seconds % 60).toFixed();
        seconds = seconds < 10 ? "0" + seconds : seconds;
        return hours > 0 ? hours + ":" : "" + minutes + ":" + seconds;
    };

    const removeSong = async (song) => {
        try {
            await axios.patch(
                `/api/playlist/${playlistId}/delete-song`,
                {
                    song,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const response = await axios.get(`/api/playlist/${playlistId}`);
            setPlaylistData(...response.data);
        } catch (e) {
            setNotificationStatus({
                isActive: true,
                message:
                    "Something went wrong and we couldn't delete the song. Please try again later.",
                severity: "error",
            });
        }
    };

    const openLyrics = async (songTitle, artist) => {
        try {
            setOpenModal(true);
            setIsLoading(true);
            const response = await axios.get("/api/lyrics", {
                params: { songTitle, artist },
            });
            setLyrics(response.data);
            setIsLoading(false);
        } catch (e) {
            setNotificationStatus({
                isActive: true,
                message: "Lyrics are unavailable.",
                severity: "error",
            });
        }
    };

    const renderTableData = () => {
        if (playlistData?.songs?.length) {
            return playlistData.songs.map((song, index) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={song.id}>
                        <Cell>{index + 1}</Cell>
                        <SongInfoCell
                            song={song}
                            setAudioSource={setAudioSource}
                        />
                        <Cell>{song.album.name}</Cell>
                        <Cell>{song.dateAdded}</Cell>
                        <Cell>{convertDuration(song.duration_ms)}</Cell>
                        <Cell>
                            <LyricsIcon
                                className="link"
                                onClick={() =>
                                    openLyrics(song.name, song.artists[0].name)
                                }
                            />
                        </Cell>
                        {user.email === playlistData.user && (
                            <Cell>
                                <Tooltip title="Remove Song">
                                    <DeleteOutlineIcon
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => removeSong(song)}
                                    />
                                </Tooltip>
                            </Cell>
                        )}
                    </TableRow>
                );
            });
        } else
            return (
                <TableRow>
                    <Cell>There are no songs yet in this playlist!</Cell>
                </TableRow>
            );
    };

    return (
        <Paper
            sx={{
                width: "100%",
                backgroundColor: "#121212",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: 250,
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h2"
                    sx={{ paddingTop: "25px", color: PRIMARY_BLUE }}
                >
                    {playlistData.name}
                </Typography>
                <Typography variant="h6">
                    Created by:{" "}
                    <Link className="link" to={`/user/${playlistData.userId}`}>
                        {playlistData.username}
                    </Link>
                </Typography>
                <Typography variant="h6">
                    {playlistData && playlistData.songs
                        ? playlistData.songs.length
                        : "0"}{" "}
                    songs
                </Typography>
                {user.email === playlistData.user && (
                    <Box>
                        <Link to={`/playlist/${playlistId}/add`}>
                            <PrimaryButton
                                sx={{ width: "10%", marginRight: "10px" }}
                                variant="outlined"
                            >
                                Add Songs
                            </PrimaryButton>
                        </Link>
                        <Link to={`/playlist/${playlistId}/delete`}>
                            <PrimaryButton
                                sx={{ width: "10%" }}
                                variant="outlined"
                                color="error"
                            >
                                Delete Playlist
                            </PrimaryButton>
                        </Link>
                    </Box>
                )}
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHeadCell
                                    key={column.id}
                                    align={column.align}
                                    sx={{ width: column.width }}
                                >
                                    {column.label}
                                </TableHeadCell>
                            ))}
                            <TableHeadCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderTableData()}</TableBody>
                </Table>
            </TableContainer>
            {audioSource && <AudioControls url={audioSource} />}
            {openModal && (
                <PlaylistActionModal
                    content={
                        isLoading ? (
                            <CircularProgress sx={{ padding: "2rem" }} />
                        ) : (
                            <Box
                                sx={{
                                    color: "white",
                                    overflow: "auto",
                                    height: "45vh",
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {lyrics}
                            </Box>
                        )
                    }
                    onDismiss={() => setOpenModal(false)}
                    actions={
                        <PrimaryButton onClick={() => setOpenModal(false)}>
                            Close
                        </PrimaryButton>
                    }
                    height="50%"
                />
            )}
        </Paper>
    );
}
