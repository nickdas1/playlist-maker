import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const editPlaylistRoute = {
    path: "/api/playlist/:id/edit",
    method: "patch",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const { id } = req.params;
        const { addedSongs } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res
                .status(401)
                .json({ message: "No authorization header sent" });
        }

        const today = new Date(Date.now());
        const month = today.toLocaleString("default", { month: "short" });
        const day = today.getDate();
        const year = today.getFullYear();

        addedSongs.forEach((song) => {
            song.dateAdded = `${month} ${day}, ${year}`;
        });

        const token = authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err) => {
            if (err)
                return res
                    .status(401)
                    .json({ message: "Unable to verify token" });

            await db
                .collection("playlists")
                .updateOne(
                    { _id: ObjectId(id) },
                    { $push: { songs: { $each: addedSongs } } }
                );

            res.sendStatus(200);
        });
    },
};
