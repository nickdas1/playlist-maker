const { addSongsRoute } = require("./addSongsRoute");
const { allPlaylistsRoute } = require("./allPlaylistsRoute");
const { createPlaylistRoute } = require("./createPlaylistRoute");
const { deletePlaylistRoute } = require("./deletePlaylistRoute");
const { deleteSongRoute } = require("./deleteSongRoute");
const { forgotPasswordRoute } = require("./forgotPasswordRoute");
const { getGoogleOauthUrlRoute } = require("./getGoogleOauthUrlRoute");
const { googleOauthCallbackRoute } = require("./googleOauthCallbackRoute");
const { loginRoute } = require("./loginRoute");
const { playlistRoute } = require("./playlistRoute");
const { playlistsByUserRoute } = require("./playlistsByUserRoute");
const { profileRoute } = require("./profileRoute");
const { resetPasswordRoute } = require("./resetPasswordRoute");
const { searchSongsRoute } = require("./searchSongsRoute");
const { signUpRoute } = require("./signUpRoute");
const { songsRoute } = require("./songsRoute");
const { verifyEmailRoute } = require("./verifyEmailRoute");

module.exports.routes = [
    allPlaylistsRoute,
    createPlaylistRoute,
    deletePlaylistRoute,
    deleteSongRoute,
    addSongsRoute,
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
