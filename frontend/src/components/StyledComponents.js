import { styled } from "@mui/material/styles";
import { AppBar, Box, Button, Input, MenuItem, TableCell } from "@mui/material";

export const PRIMARY_BLUE = "#3072FE";
export const PRIMARY_ERROR = "rgb(211, 47, 47)";
export const PRIMARY_SUCCESS = "rgb(56, 142, 60)";

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

export const NavMenu = styled(AppBar)(() => ({
    background: "black",
}));

export const SideMenu = styled(Box)(() => ({
    width: "15%",
    backgroundColor: "black",
}));

export const SideMenuItem = styled(MenuItem)(() => ({
    color: "#b3b3b3",
    "&:hover": {
        color: "white",
    },
}));

export const Cell = styled(TableCell)(() => ({
    borderBottom: "none",
    color: "white",
}));

export const TableHeadCell = styled(TableCell)(() => ({
    backgroundColor: "#121212",
    borderBottom: "1px solid hsla(0,0%,100%,.1)",
    color: "#b3b3b3 !important",
}));
