import Box from "@mui/material/Box";

import NavBar from "./NavBar";
import Playlist from "./Playlist";
import SideBar from "./SideBar";

export default function Layout() {
    return (
        <div>
            <NavBar />
            <Box sx={{ display: "flex" }}>
                <SideBar />
                <Playlist />
            </Box>
        </div>
    );
}
