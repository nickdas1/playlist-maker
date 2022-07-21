import { createPlaylistRoute } from './createPlaylistRoute';
import { editPlaylistRoute } from './editPlaylistRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { loginRoute } from './loginRoute';
import { playlistRoute } from './playlistRoute';
import { profileRoute } from './profileRoute';
import { resetPasswordRoute } from './resetPasswordRoute';
import { signUpRoute } from './signUpRoute';
import { songsRoute } from './songsRoute';
import { testRoute } from './testRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    createPlaylistRoute,
    editPlaylistRoute,
    forgotPasswordRoute,
    loginRoute,
    playlistRoute,
    profileRoute,
    resetPasswordRoute,
    signUpRoute,
    songsRoute,
    testRoute,
    verifyEmailRoute
];
