import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    CircularProgress,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Cell, InfoInput, PrimaryButton } from "../StyledComponents";
import PlaylistActionModal from "./PlaylistActionModal";
import { useToken } from "../../auth/useToken";
import InfoSnackbar from "../InfoSnackbar";

export default function AddSongs() {
    const [token] = useToken();
    const [songData, setSongData] = useState([]);
    const [playlistData, setPlaylistData] = useState({});
    const [addedSongs, setAddedSongs] = useState([]);
    const [query, setQuery] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { id: playlistId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`/api/playlist/${playlistId}`);
            setPlaylistData(...response.data);
        };
        getData();
    }, [playlistId]);

    useEffect(() => {
        const getSongs = async () => {
            if (!query) return setSongData([]);
            setIsLoading(true);
            let results = [];
            try {
                results = await axios.get(`/api/songs/search?q=${query}`);
                setSongData(results.data);
                setIsLoading(false);
            } catch (e) {
                setShowErrorMessage(true);
            }
        };
        const timeoutId = setTimeout(() => getSongs(), 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const addSong = (song) => {
        setAddedSongs([...addedSongs, song]);
    };

    const isSongInPlaylist = (selectedSong) => {
        if (selectedSong) {
            return playlistData.songs.find(
                (song) => song.id === selectedSong.id
            ) ||
                addedSongs.find((song) => song.id === selectedSong.id) !==
                    undefined
                ? true
                : false;
        }
        return false;
    };

    const updatePlaylist = async () => {
        try {
            await axios.patch(
                `/api/playlist/${playlistId}/add`,
                {
                    addedSongs,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate(`/playlist/${playlistId}`);
        } catch (e) {
            setShowErrorMessage(true);
            setAddedSongs([]);
        }
    };

    const renderTableData = () => {
        if (songData) {
            return songData.map((song) => (
                <TableRow key={song.id}>
                    <Cell sx={{ paddingRight: 0 }}>
                        <img
                            src={song.album.images[2].url}
                            className="album-cover"
                            alt={song.album.title}
                        />
                    </Cell>
                    <Cell sx={{ paddingLeft: 0 }}>
                        {song.name}
                        <p className="artists">{song.artists[0].name}</p>
                    </Cell>
                    <Cell>
                        <Tooltip
                            title={
                                isSongInPlaylist(song)
                                    ? "Already in the playlist"
                                    : "Add song"
                            }
                        >
                            <span>
                                <button
                                    onClick={() => addSong(song)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                    }}
                                    disabled={isSongInPlaylist(song)}
                                >
                                    <AddCircleIcon
                                        sx={
                                            !isSongInPlaylist(song)
                                                ? {
                                                      cursor: "pointer",
                                                      color: "white",
                                                  }
                                                : { color: "black" }
                                        }
                                    />
                                </button>
                            </span>
                        </Tooltip>
                    </Cell>
                </TableRow>
            ));
        }
    };

    const content = () => {
        return (
            <TableContainer
                sx={{
                    width: "100%",
                    backgroundColor: "#121212",
                    height: "70%",
                    margin: "20px 0",
                }}
            >
                <Typography sx={{ color: "white" }}>
                    {songData.length} Results
                </Typography>
                {isLoading && <CircularProgress sx={{ padding: "2rem" }} />}
                <Table>
                    <TableBody>{renderTableData()}</TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <>
            <PlaylistActionModal
                header={
                    <InfoInput
                        type="text"
                        placeholder="Search For a Song"
                        disableUnderline
                        onChange={(e) => setQuery(e.target.value)}
                    />
                }
                content={content()}
                actions={
                    <>
                        <PrimaryButton
                            onClick={() => {
                                updatePlaylist();
                            }}
                            variant="contained"
                            color="primary"
                        >
                            Save Added Songs
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={() => navigate(`/playlist/${playlistId}`)}
                            variant="outlined"
                            color="error"
                        >
                            Cancel
                        </PrimaryButton>
                    </>
                }
                onDismiss={() => navigate(`/playlist/${playlistId}`)}
                height="70vh"
            />
            {showErrorMessage && (
                <InfoSnackbar
                    showMessage={showErrorMessage}
                    setShowMessage={setShowErrorMessage}
                    message="Something went wrong and we couldn't add songs. Please try again later."
                />
            )}
        </>
    );
}
