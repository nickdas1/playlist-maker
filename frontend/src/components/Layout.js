import Box from "@mui/material/Box";

import Playlist from "./playlists/Playlist";
import SideBar from "./SideBar";

export default function Layout() {
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <SideBar />
                <Playlist />
            </Box>
        </div>
    );
}
