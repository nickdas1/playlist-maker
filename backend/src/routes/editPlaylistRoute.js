import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const editPlaylistRoute = {
    path: "/api/playlist/:id/edit",
    method: "patch",
    handler: async (req, res) => {
        const db = getDbConnection("spotifyre");
        const { id } = req.params;
        const { songs } = req.body;

        const today = new Date(Date.now());
        const month = today.toLocaleString("default", { month: "short" });
        const day = today.getDate();
        const year = today.getFullYear();

        songs.forEach((song) => {
            song.dateAdded = `${month} ${day}, ${year}`;
        });

        await db
            .collection("playlists")
            .updateOne(
                { _id: ObjectId(id) },
                { $push: { songs: { $each: songs } } }
            );

        res.sendStatus(200);
    },
};
