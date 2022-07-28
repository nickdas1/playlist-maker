import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const deleteSongRoute = {
    path: "/api/playlist/:id/delete-song",
    method: "patch",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const { id } = req.params;
        const { song } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res
                .status(401)
                .json({ message: "No authorization header sent" });
        }

        const token = authorization.split(" ")[1];

        jwt.verify('token', process.env.JWT_SECRET, async (err) => {
            if (err)
                return res
                    .status(401)
                    .json({ message: "Unable to verify token" });

            await db
                .collection("playlists")
                .updateOne(
                    { _id: ObjectId(id) },
                    { $pull: { songs: { $in: [song] } } }
                );

            res.sendStatus(200);
        });
    },
};
