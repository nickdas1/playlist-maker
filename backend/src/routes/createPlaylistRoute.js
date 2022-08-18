const { getDbConnection } = require("../db");

module.exports.createPlaylistRoute = {
    path: "/api/playlist/create",
    method: "post",
    handler: async (req, res) => {
        const db = getDbConnection("playlister");
        const { name, songs, user, username, isVerified } = req.body;

        if (!isVerified)
            return res.status(403).json({
                message:
                    "You must verify your email address before you can create a playlist",
            });

        const today = new Date(Date.now());
        const month = today.toLocaleString("default", { month: "short" });
        const day = today.getDate();
        const year = today.getFullYear();

        const dateCreated = `${month} ${day}, ${year}`;

        const result = await db
            .collection("playlists")
            .insertOne({ name, songs, user, username, dateCreated });
        res.status(200).send(result);
    },
};
