const { ObjectId } = require("mongodb");
const { getDbConnection } = require("../db");
const { isValidObjectId } = require("../util/isValidObjectId");

module.exports.getUserRoute = {
    path: "/api/users/:userId",
    method: "get",
    handler: async (req, res) => {
        const { userId } = req.params;

        if (!isValidObjectId(userId)) return res.status(404).send(undefined);

        const db = getDbConnection("playlister");
        const user = await db
            .collection("users")
            .find({ _id: ObjectId(userId) });

        user.toArray((err, data) => {
            if (data.length) {
                const { info, username } = data[0];
                res.status(200).send({ info, username });
            } else {
                res.status(200).send(undefined);
            }
        });
    },
};
