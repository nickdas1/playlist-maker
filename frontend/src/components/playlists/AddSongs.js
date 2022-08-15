import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Box,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Cell, InfoInput, PrimaryButton } from "../StyledComponents";
import PlaylistActionModal from "./PlaylistActionModal";
import { useToken } from "../../auth/useToken";

export default function AddSongs() {
    const [token] = useToken();
    const [songData, setSongData] = useState([]);
    const [playlistData, setPlaylistData] = useState({});
    const [addedSongs, setAddedSongs] = useState([]);
    const [query, setQuery] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);

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
            const res = await axios.get(
                `https://api.spotify.com/v1/search?q=${query}&type=track&market=US`,
                {
                    headers: {
                        Authorization:
                            "Bearer BQCxvE1EYkzIJxXnv9yl5HPCmRBV4xxxWhsGZlhlck5T_D0Pz6nv13GzKoRWEqhhcyf689_aTCRgmk-uUDc6-lGrhFjnIfKnPrrfEML37UGo4pX4e7aRv4549qyO2VoDZmMGqiaVIpZV7-eBePzhS18hQitE8MnhzVmBJpIOrVXZ9jHQODOHO3VtFPW_3a3DVMU",
                    },
                }
            );
            setSongData(res.data.tracks.items);
        };
        const timeoutId = setTimeout(() => getSongs(), 500);
        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showErrorMessage]);

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
                {showErrorMessage && (
                    <Box className="fail">
                        Something went wrong and we couldn't add songs. Please
                        try again later.
                    </Box>
                )}
                <Table>
                    <TableBody>{renderTableData()}</TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
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
                <PrimaryButton
                    onClick={() => {
                        updatePlaylist();
                    }}
                    variant="contained"
                    color="primary"
                >
                    Save Added Songs
                </PrimaryButton>
            }
            onDismiss={() => navigate(`/playlist/${playlistId}`)}
            height="70vh"
        />
    );
}
