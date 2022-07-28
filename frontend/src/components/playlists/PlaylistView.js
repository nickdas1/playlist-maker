import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    Cell,
    DangerButton,
    PrimaryButton,
    TableHeadCell,
} from "../StyledComponents";
import { useUser } from "../../auth/useUser";
import { useToken } from "../../auth/useToken";

export default function PlaylistView() {
    const [token] = useToken();
    const user = useUser();

    const { id: playlistId } = useParams();

    const [playlistData, setPlaylistData] = useState({});
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`/api/playlist/${playlistId}`);
            setPlaylistData(...response.data);
        };
        getData();
    }, [playlistId]);

    useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showErrorMessage]);

    const columns = [
        { id: "number", label: "#" },
        { id: "title", label: "Title" },
        {
            id: "album",
            label: "Album",
            align: "left",
            format: "",
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
            setShowErrorMessage(true);
        }
    };

    const renderTableData = () => {
        if (playlistData?.songs?.length) {
            return playlistData.songs.map((song, index) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={song.id}>
                        <Cell>{index + 1}</Cell>
                        <Cell
                            sx={{
                                borderBottom: "none",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={song.album.images[2].url}
                                className="album-cover"
                                alt={song.album.title}
                            />
                            <Box>
                                {song.name}
                                <p className="artists">
                                    {song.artists[0].name}
                                </p>
                            </Box>
                        </Cell>
                        <Cell>{song.album.name}</Cell>
                        <Cell>{song.dateAdded}</Cell>
                        <Cell>{convertDuration(song.duration_ms)}</Cell>
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
                    height: 300,
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Typography variant="h2" sx={{ paddingTop: "50px" }}>
                    {playlistData.name}
                </Typography>
                <Typography variant="h6">
                    Created by: {playlistData.username}
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
                            <DangerButton
                                sx={{ width: "10%" }}
                                variant="outlined"
                                color="error"
                            >
                                Delete Playlist
                            </DangerButton>
                        </Link>
                    </Box>
                )}
            </Box>
            {showErrorMessage && (
                <Box className="fail">
                    Something went wrong and we couldn't delete the song.
                    Please try again later.
                </Box>
            )}
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHeadCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
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
        </Paper>
    );
}
