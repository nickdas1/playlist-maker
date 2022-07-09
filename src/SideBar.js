import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";

export default function SideBar() {
    return (
        <Box
            sx={{
                width: "15%",
                backgroundColor: "black",
            }}
        >
            <MenuList>
                <MenuItem className="menu-item">Home</MenuItem>
                <MenuItem className="menu-item">Search</MenuItem>
                <MenuItem className="menu-item">+ Create Playlist</MenuItem>
                <MenuItem className="menu-item">Playlist #1</MenuItem>
                <MenuItem className="menu-item">Playlist #2</MenuItem>
                <MenuItem className="menu-item">Playlist #3</MenuItem>
            </MenuList>
        </Box>
    );
}
