const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { getDbConnection } = require("../db");

module.exports.profileRoute = {
    path: "/api/users/:userId",
    method: "put",
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        const updates = (({ favoriteGenre, favoriteArtist, favoriteSong }) => ({
            favoriteGenre,
            favoriteArtist,
            favoriteSong,
        }))(req.body);

        if (!authorization) {
            return res
                .status(401)
                .json({ message: "No authorization header sent" });
        }

        // Gets token from "Bearer <token>"
        const token = authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err)
                return res
                    .status(401)
                    .json({ message: "Unable to verify token" });

            const { id, isVerified } = decoded;

            if (id !== userId)
                return res.status(403).json({
                    message: "Not allowed to update that user's data",
                });

            if (!isVerified)
                return res.status(403).json({
                    message:
                        "You must verify your email address before you can update your data",
                });

            const db = getDbConnection("playlister");
            const result = await db
                .collection("users")
                .findOneAndUpdate(
                    { _id: ObjectId(id) },
                    { $set: { info: updates } },
                    { returnOriginal: false }
                );
            const { email, username, info } = result.value;

            jwt.sign(
                { id, email, username, isVerified, info },
                process.env.JWT_SECRET,
                { expiresIn: "7d" },
                (err, token) => {
                    if (err) return res.status(500).json(err);
                    res.status(200).json({ token });
                }
            );
        });
    },
};
