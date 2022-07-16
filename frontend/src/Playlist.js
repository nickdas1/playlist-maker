import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import drake from "./json/drake";

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
    const [data, setData] = useState([]);

    useEffect(() => {
        let temp = [];
        for (let song of drake) {
            temp.push(song);
            setData(temp);
        }
    }, []);

    return (
        <Paper
            sx={{
                width: "100%",
                backgroundColor: "#121212",
            }}
        >
            <TableContainer sx={{ maxHeight: "100vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead sx={{ backgroundColor: "#121212" }}>
                        <TableRow sx={{ backgroundColor: "#121212" }}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    sx={{
                                        backgroundColor: "#121212",
                                        borderBottom:
                                            "1px solid hsla(0,0%,100%,.1)",
                                        color: "#b3b3b3 !important",
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((song, index) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={index + 1}
                                >
                                    <TableCell sx={{ borderBottom: "none" }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            borderBottom: "none",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <img
                                            src={song.album.images[2].url}
                                            style={{ paddingRight: "15px" }}
                                            alt={song.album.title}
                                        />
                                        <div>
                                            {song.name}
                                            <p className="artists">
                                                {song.artists[0].name}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: "none" }}>
                                        {song.album.name}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: "none" }}>
                                        July 9, 2022
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: "none" }}>
                                        {convertDuration(song.duration_ms)}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
