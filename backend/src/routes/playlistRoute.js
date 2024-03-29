const { getDbConnection } = require("../db");
const { ObjectId } = require("mongodb");
const { isValidObjectId } = require("../util/isValidObjectId");

module.exports.playlistRoute = {
    path: "/api/playlist/:id",
    method: "get",
    handler: async (req, res) => {
        const { id } = req.params;

        if (!isValidObjectId(id)) return res.status(404).send(undefined);

        const db = getDbConnection("playlister");
        const playlist = await db
            .collection("playlists")
            .find({ _id: ObjectId(id) });

        playlist.toArray((err, data) => {
            res.status(200).send(data);
        });
    },
};
