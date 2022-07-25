import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const deletePlaylistRoute = {
    path: "/api/playlist/:id/delete",
    method: "delete",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const { id } = req.params;

        await db.collection("playlists").deleteOne({ _id: ObjectId(id) });

        res.sendStatus(200);
    },
};
