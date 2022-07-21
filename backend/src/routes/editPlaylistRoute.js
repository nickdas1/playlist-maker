import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const editPlaylistRoute = {
    path: "/api/playlist/:id/edit",
    method: "patch",
    handler: async (req, res) => {
        const db = getDbConnection("spotifyre");
        const { id } = req.params;
        const { songs } = req.body;
        console.log(id);
        await db.collection("playlists").updateOne(
            { _id: ObjectId(id) }, 
            { $push: { songs: {$each: songs} } }
        );
    },
};