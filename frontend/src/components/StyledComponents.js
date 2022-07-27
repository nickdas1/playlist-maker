import { styled, alpha } from "@mui/material/styles";
import {
    AppBar,
    Box,
    Button,
    Input,
    InputBase,
    MenuItem,
    TableCell,
} from "@mui/material";

export const PRIMARY_BLUE = "#3072FE";

export const Cell = styled(TableCell)(() => ({
    borderBottom: "none",
    color: "white",
}));

export const InfoContainer = styled(Box)(() => ({
    alignItems: "center",
    display: "flex",
    height: "75vh",
    justifyContent: "center",
}));

export const ProfileContainer = styled(Box)(() => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
}));

export const InfoBox = styled(Box)(() => ({
    background: "rgba(0,0,0,.5)",
    boxSizing: "border-box",
    borderRadius: "15px",
    color: "white",
    height: "55vh",
    width: "50vh",
    padding: "40px",
    textAlign: "center",
    "@media only screen and (max-width: 600px)": {
        height: "70vh",
    },
}));

export const InfoInput = styled(Input)(() => ({
    border: `1px solid white`,
    borderRadius: "5px",
    color: "white",
    margin: "8px 0",
    padding: "2px 10px",
    width: "100%",
}));

export const PrimaryButton = styled(Button)(() => ({
    borderRadius: "30px",
    marginTop: "15px",
    width: "80%",
    "@media only screen and (max-width: 600px)": {
        fontSize: "10px",
    },
}));

export const DangerButton = styled(Button)(() => ({
    borderRadius: "30px",
    marginTop: "15px",
    width: "80%",
    "@media only screen and (max-width: 600px)": {
        fontSize: "10px",
    },
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
export const NavMenu = styled(AppBar)(() => ({
    background: "black",
}));

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
