const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getDbConnection } = require("../db");
require("dotenv").config();

module.exports.loginRoute = {
    path: "/api/login",
    method: "post",
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection("playlister");
        const user = await db.collection("users").findOne({ email });

        if (!user) return res.sendStatus(401);

        const { _id: id, isVerified, passwordHash, salt, info, username } = user;
        const pepper = process.env.PEPPER_STRING;

        const isCorrect = await bcrypt.compare(salt + password + pepper, passwordHash);

        if (isCorrect) {
            jwt.sign(
                { id, isVerified, email, username, info },
                process.env.JWT_SECRET,
                { expiresIn: "7d" },
                (err, token) => {
                    if (err) {
                        res.status(500).json(err);
                    }

                    res.status(200).json({ token });
                }
            );
        } else {
            res.sendStatus(401);
        }
    },
};
