import { getDbConnection } from "../db";
import { ObjectId } from "mongodb";

export const playlistRoute = {
    path: "/api/playlist/:id",
    method: "get",
    handler: async (req, res) => {
        const playlistId = req.params;
        const db = getDbConnection("spotifyre");
        const playlist = db
            .collection("playlists")
            .find({ _id: ObjectId(playlistId) });
        
            playlist.toArray((err, data) => {
                res.send(data);
            });
    },
};
