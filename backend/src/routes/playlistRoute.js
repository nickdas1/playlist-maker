const { getDbConnection } = require("../db");
const { ObjectId } = require("mongodb");

module.exports.playlistRoute = {
    path: "/api/playlist/:id",
    method: "get",
    handler: async (req, res) => {
        const { id } = req.params;
        const db = getDbConnection("playlister");
        const playlist = await db
            .collection("playlists")
            .find({ _id: ObjectId(id) });

        playlist.toArray((err, data) => {
            res.status(200).send(data);
        });
    },
};
