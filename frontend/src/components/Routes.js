import { Routes, Route } from "react-router-dom";
import AddSongs from "./playlists/AddSongs";
import CreatePlaylist from "./playlists/CreatePlaylist";
import EditPlaylist from "./playlists/EditPlaylist";
import EmailVerificationLandingPage from "./users/EmailVerificationLandingPage";
import ForgotPassword from "./users/ForgotPassword";
import Layout from "./Layout";
import Login from "./users/Login";
import PleaseVerifyEmail from "./users/PleaseVerifyEmail";
import Profile from "./users/Profile";
import SignUp from "./users/SignUp";
import { PrivateRoute } from "../auth/PrivateRoute";
import PasswordResetLandingPage from "./users/PasswordResetLandingPage";
import PlaylistView from "./playlists/PlaylistView";

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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/playlist/create" element={<CreatePlaylist />} />
            <Route path="/playlist/:id" element={<PlaylistView />} />
            <Route path="/playlist/:id/add" element={<AddSongs />} />
            <Route path="/playlist/:id/edit" element={<EditPlaylist />} />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
            <Route path="/reset-password/:passwordResetCode" element={<PasswordResetLandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
                path="/verify-email/:verificationString"
                element={<EmailVerificationLandingPage />}
            />
            <Route path="/verify" element={<PleaseVerifyEmail />} />
        </Routes>
    );
}
