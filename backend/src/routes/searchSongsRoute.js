const spotifyApi = require("../spotifyApi");

module.exports.searchSongsRoute = {
    path: "/api/songs/search",
    method: "get",
    handler: async (req, res) => {
        const { q: query } = req.query;

        spotifyApi.searchTracks(query).then(
            (data) => {
                res.status(200).send(data.body.tracks.items);
            },
            (err) => {
                res.sendStatus(500);
            }
        );
    },
};
