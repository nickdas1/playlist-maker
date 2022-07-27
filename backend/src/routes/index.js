import { allPlaylistsRoute } from "./allPlaylistsRoute";
import { createPlaylistRoute } from "./createPlaylistRoute";
import { deletePlaylistRoute } from "./deletePlaylistRoute";
import { deleteSongRoute } from "./deleteSongRoute";
import { editPlaylistRoute } from "./editPlaylistRoute";
import { forgotPasswordRoute } from "./forgotPasswordRoute";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthUrlRoute";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute";
import { loginRoute } from "./loginRoute";
import { playlistRoute } from "./playlistRoute";
import { playlistsByUserRoute } from "./playlistsByUserRoute";
import { profileRoute } from "./profileRoute";
import { resetPasswordRoute } from "./resetPasswordRoute";
import { searchSongsRoute } from "./searchSongsRoute";
import { signUpRoute } from "./signUpRoute";
import { songsRoute } from "./songsRoute";
import { verifyEmailRoute } from "./verifyEmailRoute";

export const routes = [
    allPlaylistsRoute,
    createPlaylistRoute,
    deletePlaylistRoute,
    deleteSongRoute,
    editPlaylistRoute,
    forgotPasswordRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    loginRoute,
    playlistsByUserRoute,
    playlistRoute,
    profileRoute,
    resetPasswordRoute,
    searchSongsRoute,
    signUpRoute,
    songsRoute,
    verifyEmailRoute,
];
