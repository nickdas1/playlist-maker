import { getDbConnection } from "../db";

export const searchSongsRoute = {
    path: "/api/songs/search",
    method: "get",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const { q: query } = req.query;

        const result = await db.collection("songs").find({"name" : new RegExp(query, "i")});
        result.toArray((err, songs) => {
            res.status(200).send(songs);
        });
    },
};
