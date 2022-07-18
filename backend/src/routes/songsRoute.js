import { getDbConnection } from "../db";

export const songsRoute = {
    path: "/api/songs",
    method: "get",
    handler: async (req, res) => {
        const db = getDbConnection("spotifyre");
        const result = await db.collection("songs").find({});
        result.toArray((err, songs) => {
            res.send(songs);
        });
    },
};
