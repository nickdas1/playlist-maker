import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Cell, PrimaryButton, TableHeadCell } from "../StyledComponents";
import { Box, Typography } from "@mui/material";

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

function convertDuration(ms) {
    let seconds = ms / 1000;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = (seconds % 60).toFixed();
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return hours > 0 ? hours + ":" : "" + minutes + ":" + seconds;
}

export default function Playlist() {
    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let playlist = await axios.get(`/api/playlist/${id}`);
            setData(...playlist.data);
        };
        getData();
    }, [id]);

    const renderTableData = () => {
        if (data && data.songs) {
            return data.songs.map((song, index) => {
                return (
                    <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index + 1}
                    >
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
            <Box sx={{ width: "100%", height: 300, color: "white", textAlign: 'center' }}>
                <Typography variant="h6">Playlist:</Typography>
                <Typography variant="h2">{data.name}</Typography>
                <Typography variant="h6">Created by: {data.user}</Typography>
                <Typography variant="h6">{data && data.songs ? data.songs.length : '0'} songs</Typography>
                <Link to="/add">
                    <PrimaryButton sx={{width: '10%'}}>Add Songs</PrimaryButton>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderTableData()}</TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
