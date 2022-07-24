import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Cell, PrimaryButton } from "../StyledComponents";
import SongSearch from "./SongSearch";

export default function AddSongs() {
    const [songData, setSongData] = useState([]);

    const navigate = useNavigate();

    const { id: playlistId } = useParams();

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

    const updatePlaylist = async () => {
        await axios.patch(`/api/playlist/${playlistId}/edit`, {
            songs,
        });
    };

    console.log(songData);

    const renderTableData = () => {
        if (songData) {
            return songData.map((song) => (
                <TableRow key={song.id}>
                    <Cell>
                        {song.name}
                        <p className="artists">{song.artists[0].name}</p>
                    </Cell>
                    <Cell>
                        <AddCircleIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => addSong(song)}
                        />
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
        <SongSearch
            title="search"
            content={content()}
            done={
                <PrimaryButton
                    onClick={() => {
                        updatePlaylist();
                        navigate(`/playlist/${playlistId}`);
                    }}
                >
                    Done
                </PrimaryButton>
            }
            onDismiss={() => navigate(`/playlist/${playlistId}`)}
        />
    );
}
