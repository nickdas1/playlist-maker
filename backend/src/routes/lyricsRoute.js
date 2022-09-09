const lyricsFinder = require("lyrics-finder")

module.exports.lyricsRoute = {
    path: "/api/lyrics",
    method: "get",
    handler: async (req, res) => {
        const {artist, songTitle} = req.query;
        const lyrics = await lyricsFinder(artist, songTitle) || "No Lyrics Found";

        res.status(200).send(lyrics);
    },
};