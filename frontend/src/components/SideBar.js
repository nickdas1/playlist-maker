import * as React from "react";
import MenuList from "@mui/material/MenuList";
import { SideMenu, SideMenuItem } from "./StyledComponents";
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <SideMenu>
            <MenuList>
                <SideMenuItem className="menu-item">Home</SideMenuItem>
                <SideMenuItem className="menu-item">Search</SideMenuItem>
                <Link to="/playlist/create">
                    <SideMenuItem className="menu-item">
                        + Create Playlist
                    </SideMenuItem>
                </Link>
                <Link to="/playlist/62d5727164be763d0d02bb94">
                    <SideMenuItem className="menu-item">
                        Playlist #1
                    </SideMenuItem>
                </Link>
                <SideMenuItem className="menu-item">Playlist #2</SideMenuItem>
                <SideMenuItem className="menu-item">Playlist #3</SideMenuItem>
            </MenuList>
        </SideMenu>
    );
}
