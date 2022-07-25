import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Cell, PrimaryButton } from "../StyledComponents";
import PlaylistActionModal from "./PlaylistActionModal";

export default function AddSongs() {
    const [songData, setSongData] = useState([]);
    const [playlistData, setPlaylistData] = useState({});

    console.log("playlistData:", playlistData);
    // console.log(songData[0]._id);
    // console.log(
    //     "test ",
    //     playlistData?.songs && songData
    //         ? playlistData.songs.find((song) => song._id === songData[0]._id)
    //         : "none"
    // );

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
            const results = await axios.get(`/api/songs`);
            setSongData(results.data);
        };
        getSongs();
    }, []);

    const songs = [];

    const addSong = (song) => {
        songs.push(song);
    };

    const isSongInPlaylist = (selectedSong) => {
        if (selectedSong) {
            return playlistData.songs.find(
                (song) => song._id === selectedSong._id
            ) !== undefined
                ? true
                : false;
        }
        return false;
        // console.log(selectedSong)
        // if (selectedSong) console.log(playlistData.songs.find(song => song._id === selectedSong._id))
    };

    const updatePlaylist = async () => {
        await axios.patch(`/api/playlist/${playlistId}/edit`, {
            songs,
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
                        <button
                            onClick={() => addSong(song)}
                            style={{ background: "none", border: "none" }}
                            disabled={isSongInPlaylist(song)}
                        >
                            <AddCircleIcon
                                sx={
                                    !isSongInPlaylist(song)
                                        ? { cursor: "pointer", color: "white" }
                                        : { color: "black" }
                                }
                            />
                        </button>
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
                    height: "200px",
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
            title="search"
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
                    Add Songs
                </PrimaryButton>
            }
            onDismiss={() => navigate(`/playlist/${playlistId}`)}
        />
    );
}
