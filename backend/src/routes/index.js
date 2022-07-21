import { createPlaylistRoute } from './createPlaylistRoute';
import { editPlaylistRoute } from './editPlaylistRoute';
import { loginRoute } from './loginRoute';
import { playlistRoute } from './playlistRoute';
import { profileRoute } from './profileRoute';
import { signUpRoute } from './signUpRoute';
import { songsRoute } from './songsRoute';
import { testRoute } from './testRoute';
import { verifyEmailRoute } from './verifyEmailRoute';

export const routes = [
    createPlaylistRoute,
    editPlaylistRoute,
    loginRoute,
    playlistRoute,
    profileRoute,
    signUpRoute,
    songsRoute,
    testRoute,
    verifyEmailRoute
];
