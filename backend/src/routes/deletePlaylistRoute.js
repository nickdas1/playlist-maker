const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { getDbConnection } = require("../db");
const { isValidObjectId } = require("../util/isValidObjectId");

module.exports.deletePlaylistRoute = {
    path: "/api/playlist/:id/delete",
    method: "delete",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const { id } = req.params;
        const { authorization } = req.headers;

        if (!isValidObjectId(id)) return res.status(404).send(undefined);

        if (!authorization) {
            return res
                .status(401)
                .json({ message: "No authorization header sent" });
        }

        const token = authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err) => {
            if (err)
                return res
                    .status(401)
                    .json({ message: "Unable to verify token" });

            await db.collection("playlists").deleteOne({ _id: ObjectId(id) });

            res.sendStatus(200);
        });
    },
};
