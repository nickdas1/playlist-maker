import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const deleteSongRoute = {
    path: "/api/playlist/:id/delete-song",
    method: "patch",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const { id } = req.params;
        const { song } = req.body;

        await db
            .collection("playlists")
            .updateOne(
                { _id: ObjectId(id) },
                { $pull: { songs: { $in: [song] } } }
            );
        
        res.sendStatus(200);
    },
};
