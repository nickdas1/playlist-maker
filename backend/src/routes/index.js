import { createPlaylistRoute } from './createPlaylistRoute';
import { editPlaylistRoute } from './editPlaylistRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';
import { loginRoute } from './loginRoute';
import { playlistRoute } from './playlistRoute';
import { profileRoute } from './profileRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { signUpRoute } from './signUpRoute';
import { songsRoute } from './songsRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    createPlaylistRoute,
    editPlaylistRoute,
    forgotPasswordRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    loginRoute,
    playlistRoute,
    profileRoute,
    resetPasswordRoute,
    signUpRoute,
    songsRoute,
    verifyEmailRoute
];
