import * as React from "react";
import MenuList from "@mui/material/MenuList";
import { SideMenu, SideMenuItem } from "./StyledComponents";

export default function SideBar() {
    return (
        <SideMenu
        >
            <MenuList>
                <SideMenuItem className="menu-item">Home</SideMenuItem>
                <SideMenuItem className="menu-item">Search</SideMenuItem>
                <SideMenuItem className="menu-item">+ Create Playlist</SideMenuItem>
                <SideMenuItem className="menu-item">Playlist #1</SideMenuItem>
                <SideMenuItem className="menu-item">Playlist #2</SideMenuItem>
                <SideMenuItem className="menu-item">Playlist #3</SideMenuItem>
            </MenuList>
        </SideMenu>
    );
}
