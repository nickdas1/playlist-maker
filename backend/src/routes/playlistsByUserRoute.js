const { getDbConnection } = require("../db");

module.exports.playlistsByUserRoute = {
    path: "/api/users/playlists",
    method: "post",
    handler: async (req, res) => {
        const { userId } = req.body;

        const db = getDbConnection("playlister");
        const playlists = await db.collection("playlists").find({ userId });
        
        playlists.toArray((err, data) => {
            res.status(200).send(data);
        });
    },
};
