import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const editPlaylistRoute = {
    path: "/api/playlist/:id/edit",
    method: "patch",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const { id } = req.params;
        const { addedSongs } = req.body;

        const today = new Date(Date.now());
        const month = today.toLocaleString("default", { month: "short" });
        const day = today.getDate();
        const year = today.getFullYear();

        addedSongs.forEach((song) => {
            song.dateAdded = `${month} ${day}, ${year}`;
        });

        await db
            .collection("playlists")
            .updateOne(
                { _id: ObjectId(id) },
                { $push: { songs: { $each: addedSongs } } }
            );

        res.sendStatus(200);
    },
};
