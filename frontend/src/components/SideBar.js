import { useEffect, useState } from "react";
import axios from "axios";
import MenuList from "@mui/material/MenuList";
import { SideMenu, SideMenuItem } from "./StyledComponents";
import { Link } from "react-router-dom";

export default function SideBar() {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getPlaylists = async () => {
            const response = await axios.get(`/api/playlists`);
            console.log("res", response);
            setPlaylists(response.data.slice(0, 10));
        };
        getPlaylists();
    }, []);

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
                <hr />
                {playlists.map((playlist) => (
                    <div key={playlist._id}>
                        <Link to={`/playlist/${playlist._id}`}>
                            <SideMenuItem className="menu-item">
                                {playlist.name}
                            </SideMenuItem>
                        </Link>
                    </div>
                ))}
            </MenuList>
        </SideMenu>
    );
}
