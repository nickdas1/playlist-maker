import { getDbConnection } from "../db";
import { ObjectId } from "mongodb";

export const allPlaylistsRoute = {
    path: "/api/playlists",
    method: "get",
    handler: async (req, res) => {
        const db = getDbConnection("spotifyre");
        const playlists = await db
            .collection("playlists")
            .find({});

        playlists.toArray((err, data) => {
            res.send(data);
        });
    },
};
