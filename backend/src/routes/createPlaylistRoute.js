import { getDbConnection } from "../db";

export const createPlaylistRoute = {
    path: "/api/playlist/create",
    method: "post",
    handler: async (req, res) => {
        const db = getDbConnection("spotifyre");
        const result = await db.collection("playlists").insertOne(req.body);
        res.send(result);
    },
};
