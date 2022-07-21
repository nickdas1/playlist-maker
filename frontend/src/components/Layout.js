import Box from "@mui/material/Box";

import SideBar from "./SideBar";

export default function Layout() {
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <SideBar />
            </Box>
        </div>
    );
}
