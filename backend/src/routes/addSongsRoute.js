import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getDbConnection } from "../db";

export const addSongsRoute = {
    path: "/api/playlist/:id/add",
    method: "patch",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const { id } = req.params;
        const { addedSongs } = req.body;
        const { authorization } = req.headers;
        const addedSongIds = addedSongs.map((song) => song._id);

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

            // prevent adding songs already in the playlist
            const duplicates = [];
            const findDuplicates = await db.collection("playlists").aggregate([
                {
                    $match: { _id: ObjectId(id) },
                },
                {
                    $unwind: "$songs",
                },
                {
                    $group: {
                        _id: "$songs._id",
                        count: { $sum: 1 },
                    },
                },
                {
                    $match: {
                        _id: {
                            $in: addedSongIds,
                        },
                    },
                },
            ]);

            await findDuplicates.forEach((duplicate) => {
                duplicates.push(duplicate._id);
            });

            const filteredAddedSongs = addedSongs.filter(
                (song) => !duplicates.includes(song._id)
            );

            await db
                .collection("playlists")
                .updateOne(
                    { _id: ObjectId(id) },
                    { $push: { songs: { $each: filteredAddedSongs } } }
                );

            res.sendStatus(200);
        });
    },
};
