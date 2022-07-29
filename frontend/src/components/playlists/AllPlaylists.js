import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { Cell, PRIMARY_BLUE, TableHeadCell } from "../StyledComponents";
import { fetchPlaylists } from "../../actions";


export default function AllPlaylists() {
    const dispatch = useDispatch();
    const playlists = useSelector((state) => state.playlists);

    useEffect(() => {
        dispatch(fetchPlaylists());
    }, [dispatch]);

    const columns = [
        { id: "title", label: "Name", align: "center" },
        { id: "user", label: "Created by", align: "center" },
        {
            id: "date",
            label: "Date Created",
            align: "center",
        },
    ];

    const renderTableData = () => {
        return playlists.map((playlist) => {
            return (
                <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={playlist._id}
                >
                    <Cell sx={{ textAlign: "center", color: PRIMARY_BLUE }}>
                        <Link to={`/playlist/${playlist._id}`}>
                            {playlist.name}
                        </Link>
                    </Cell>
                    <Cell sx={{ textAlign: "center" }}>
                        {playlist.username}
                    </Cell>
                    <Cell sx={{ textAlign: "center" }}>
                        {playlist.dateCreated}
                    </Cell>
                </TableRow>
            );
        });
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
                    height: "150px",
                    color: "white",
                    textAlign: "center",
                }}
            >
                <Typography variant="h2" sx={{ paddingTop: "50px" }}>
                    All Playlists
                </Typography>
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
