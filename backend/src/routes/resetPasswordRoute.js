const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const { getDbConnection } = require("../db");

module.exports.resetPasswordRoute = {
    path: "/api/users/:passwordResetCode/reset-password",
    method: "put",
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { newPassword } = req.body;

        const db = getDbConnection("playlister");

        const newSalt = uuid();
        const pepper = process.env.PEPPER_STRING;

        const newPasswordHash = await bcrypt.hash(newSalt + newPassword + pepper, 10);

        const result = await db.collection("users").findOneAndUpdate(
            { passwordResetCode },
            {
                $set: { passwordHash: newPasswordHash, salt: newSalt },
                $unset: { passwordResetCode: "" },
            }
        );

        if (result.lastErrorObject.n === 0) return res.sendStatus(404);

        res.sendStatus(200);
    },
};
