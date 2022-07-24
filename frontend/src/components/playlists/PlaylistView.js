import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Cell, PrimaryButton, TableHeadCell } from "../StyledComponents";

export default function PlaylistView() {
    const { id: playlistId } = useParams();

    const [data, setData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`/api/playlist/${playlistId}`);
            setData(...response.data);
        };
        getData();
    }, [playlistId]);

    console.log("data:", data);

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
        await axios.patch(`/api/playlist/${playlistId}/delete-song`, {
            song
        });
        const response = await axios.get(`/api/playlist/${playlistId}`);
        setData(...response.data);
    }

    const renderTableData = () => {
        if (data && data.songs) {
            return data.songs.map((song, index) => {
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
                            <div>
                                {song.name}
                                <p className="artists">
                                    {song.artists[0].name}
                                </p>
                            </div>
                        </Cell>
                        <Cell>{song.album.name}</Cell>
                        <Cell>July 9, 2022</Cell>
                        <Cell>{convertDuration(song.duration_ms)}</Cell>
                        <Cell title="Remove Song">
                            <DeleteOutlineIcon sx={{cursor: "pointer"}} onClick={() => removeSong(song)} />
                        </Cell>
                    </TableRow>
                );
            });
        } else
            return (
                <TableRow>
                    <Cell>There are no songs in this playlist!</Cell>
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
                <Typography variant="h2">{data.name}</Typography>
                <Typography variant="h6">Created by: {data.user}</Typography>
                <Typography variant="h6">
                    {data && data.songs ? data.songs.length : "0"} songs
                </Typography>
                <Link to={`/playlist/${playlistId}/add`}>
                    <PrimaryButton sx={{ width: "10%" }}>
                        Add Songs
                    </PrimaryButton>
                </Link>
            </Box>
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
