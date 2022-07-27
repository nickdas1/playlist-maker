import { getDbConnection } from "../db";

export const playlistsByUserRoute = {
    path: "/api/users/playlists",
    method: "post",
    handler: async (req, res) => {
        const { user } = req.body;

        const db = getDbConnection("playlister");
        const playlists = await db.collection("playlists").find({ user });

        playlists.toArray((err, data) => {
            res.status(200).send(data);
        });
    },
};
