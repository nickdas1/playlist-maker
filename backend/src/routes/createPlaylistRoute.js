import { getDbConnection } from "../db";

export const createPlaylistRoute = {
    path: "/api/playlist/create",
    method: "post",
    handler: async (req, res) => {
        const db = getDbConnection("spotifyre");
        const {test} = req.body;
        const result = await db.collection("playlists").insertOne({
            test
        });
        res.send(result);
    },
};
