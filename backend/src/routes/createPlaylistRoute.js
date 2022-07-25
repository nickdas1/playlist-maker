import { getDbConnection } from "../db";

export const createPlaylistRoute = {
    path: "/api/playlist/create",
    method: "post",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const newPlaylist = req.body;

        const today = new Date(Date.now());
        const month = today.toLocaleString("default", { month: "short" });
        const day = today.getDate();
        const year = today.getFullYear();

        newPlaylist.dateCreated = `${month} ${day}, ${year}`;

        const result = await db.collection("playlists").insertOne(newPlaylist);
        res.status(200).send(result);
    },
};
