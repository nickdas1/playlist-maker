import { Routes, Route } from "react-router-dom";
import CreatePlaylist from "./playlists/CreatePlaylist";
import Layout from "./Layout";
import Login from "./users/Login";
import PlaylistView from "./playlists/PlaylistView";
import Profile from "./users/Profile";
import SignUp from "./users/SignUp";
import { PrivateRoute } from "../auth/PrivateRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/playlist/create" element={<CreatePlaylist />} />
            <Route path="/playlist/:id" element={<PlaylistView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}
