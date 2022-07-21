import { Routes, Route } from "react-router-dom";
import AddSongs from "./playlists/AddSongs";
import CreatePlaylist from "./playlists/CreatePlaylist";
import EditPlaylist from "./playlists/EditPlaylist";
import Layout from "./Layout";
import Login from "./users/Login";
import Playlist from "./playlists/Playlist";
import PleaseVerifyEmail from "./users/PleaseVerifyEmail";
import Profile from "./users/Profile";
import SignUp from "./users/SignUp";
import { PrivateRoute } from "../auth/PrivateRoute";
import EmailVerificationLandingPage from "./users/EmailVerificationLandingPage";

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
            <Route path="/add" element={<AddSongs />} />
            <Route path="/verify-email/:verificationString" element={<EmailVerificationLandingPage />} />
            <Route path="/verify" element={<PleaseVerifyEmail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/playlist/create" element={<CreatePlaylist />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/playlist/:id/edit" element={<EditPlaylist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
}
