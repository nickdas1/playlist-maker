const { getDbConnection } = require("../db");

module.exports.allPlaylistsRoute = {
    path: "/api/playlists",
    method: "get",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const playlists = await db
            .collection("playlists")
            .find({});

        playlists.toArray((err, data) => {
            res.status(200).send(data);
        });
    },
};
