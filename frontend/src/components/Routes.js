import { Routes, Route } from "react-router-dom";
import AddSongs from "./playlists/AddSongs";
import AllPlaylists from "./playlists/AllPlaylists";
import CreatePlaylist from "./playlists/CreatePlaylist";
import DeletePlaylist from "./playlists/DeletePlaylist";
import EmailVerificationLandingPage from "./users/EmailVerificationLandingPage";
import ForgotPassword from "./users/ForgotPassword";
import Login from "./users/Login";
import PasswordResetLandingPage from "./users/PasswordResetLandingPage";
import PlaylistView from "./playlists/PlaylistView";
import PleaseVerifyEmail from "./users/PleaseVerifyEmail";
import PrivateRoute from "../auth/PrivateRoute";
import Profile from "./users/Profile";
import SignUp from "./users/SignUp";
import User from "./users/User";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <AllPlaylists />
                    </PrivateRoute>
                }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/playlist/create"
                element={
                    <PrivateRoute>
                        <CreatePlaylist />
                    </PrivateRoute>
                }
            />
            <Route
                path="/playlist/:id"
                element={
                    <PrivateRoute>
                        <PlaylistView />
                    </PrivateRoute>
                }
            />
            <Route
                path="/playlist/:id/add"
                element={
                    <PrivateRoute>
                        <AddSongs />
                    </PrivateRoute>
                }
            />
            <Route
                path="/playlist/:id/delete"
                element={
                    <PrivateRoute>
                        <DeletePlaylist />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
            <Route
                path="/reset-password/:passwordResetCode"
                element={<PasswordResetLandingPage />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
                path="/user/:id"
                element={
                    <PrivateRoute>
                        <User />
                    </PrivateRoute>
                }
            />
            <Route
                path="/verify-email/:verificationString"
                element={<EmailVerificationLandingPage />}
            />
            <Route path="/verify" element={<PleaseVerifyEmail />} />
        </Routes>
    );
}
