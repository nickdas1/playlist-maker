const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const { getDbConnection } = require("../db");

module.exports.verifyEmailRoute = {
    path: "/api/verify-email",
    method: "put",
    handler: async (req, res) => {
        const { verificationString } = req.body;
        const db = getDbConnection("playlister");
        const result = await db.collection("users").findOne({
            verificationString,
        });

        if (!result)
            res.status(401).json({
                message: "The email verification code is incorrect",
            });

        const { _id: id, email, username, info } = result;

        await db.collection("users").updateOne(
            { _id: ObjectId(id) },
            {
                $set: { isVerified: true },
            }
        );

        jwt.sign(
            { id, email, username, isVerified: true, info },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
            (err, token) => {
                if (err) return res.sendStatus(500);
                res.status(200).json({ token });
            }
        );
    },
};
