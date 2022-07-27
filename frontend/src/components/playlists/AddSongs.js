import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Cell, InfoInput, PrimaryButton } from "../StyledComponents";
import PlaylistActionModal from "./PlaylistActionModal";

export default function AddSongs() {
    const [songData, setSongData] = useState([]);
    const [playlistData, setPlaylistData] = useState({});
    const [addedSongs, setAddedSongs] = useState([]);
    const [query, setQuery] = useState("");

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
            const results = await axios.get(`/api/songs/search?q=${query}`);
            setSongData(results.data);
        };
        getSongs();
    }, [query]);

    const addSong = (song) => {
        setAddedSongs([...addedSongs, song]);
    };

    const isSongInPlaylist = (selectedSong) => {
        if (selectedSong) {
            return playlistData.songs.find(
                (song) => song._id === selectedSong._id
            ) ||
                addedSongs.find((song) => song._id === selectedSong._id) !==
                    undefined
                ? true
                : false;
        }
        return false;
    };

    const updatePlaylist = async () => {
        await axios.patch(`/api/playlist/${playlistId}/edit`, {
            addedSongs,
        });
    };

    const renderTableData = () => {
        if (songData) {
            return songData.map((song) => (
                <TableRow key={song.id}>
                    <Cell>
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
                    placeholder="Enter a Song Name"
                    disableUnderline
                    onChange={(e) => setQuery(e.target.value)}
                />
            }
            content={content()}
            actions={
                <PrimaryButton
                    onClick={() => {
                        updatePlaylist();
                        navigate(`/playlist/${playlistId}`);
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
