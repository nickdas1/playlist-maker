const SpotifyWebApi = require("spotify-web-api-node");

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const newToken = () => {
    spotifyApi.clientCredentialsGrant().then(
        (data) => {
            spotifyApi.setAccessToken(data.body["access_token"]);
        },
        (err) => {
            console.log(
                "Something went wrong when retrieving an access token",
                err
            );
        }
    );
};

newToken();

setInterval(() => {
    newToken();
}, (3600 - 60) * 1000);

module.exports = spotifyApi;
