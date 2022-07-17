import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";

export const Cell = styled(TableCell)(() => ({
    borderBottom: "none",
    color: "white",
}));

export const NavMenu = styled(AppBar)(() => ({
    background: "linear-gradient(transparent 0, rgba(0,0,0,.5) 100%)",
}));

export const SideMenuItem = styled(MenuItem)(() => ({
    color: "#b3b3b3",
    "&:hover": {
        color: "white",
    },
}));

export const SideMenu = styled(Box)(() => ({
    width: "15%",
    backgroundColor: "black",
}));

export const TableHeadCell = styled(TableCell)(() => ({
    backgroundColor: "#121212",
    borderBottom: "1px solid hsla(0,0%,100%,.1)",
    color: "#b3b3b3 !important",
}));


// NavBar Components
export const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));
