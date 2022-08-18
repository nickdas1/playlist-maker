const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { getDbConnection } = require("../db");
const { sendEmail } = require("../util/sendEmail");

module.exports.signUpRoute = {
    path: "/api/signup",
    method: "post",
    handler: async (req, res) => {
        const { email, password, username } = req.body;

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) return res.status(500).send("Invalid email");

        const db = getDbConnection("playlister");
        const emailExists = await db.collection("users").findOne({ email });
        const usernameExists = await db.collection("users").findOne({ username });

        if (emailExists) {
            res.status(409).send('That email is already in use');
            return;
        }

        if (usernameExists) {
            res.status(409).send('That username is already in use');
            return;
        }

        const salt = uuid();
        const pepper = process.env.PEPPER_STRING;

        const passwordHash = await bcrypt.hash(salt + password + pepper, 10);

        const verificationString = uuid();

        const info = {
            favoriteGenre: "",
            favoriteArtist: "",
            favoriteSong: "",
        };

        const result = await db.collection("users").insertOne({
            email,
            username,
            passwordHash,
            salt,
            info,
            isVerified: false,
            verificationString,
        });
        const { insertedId } = result;

        try {
            await sendEmail({
                to: email,
                from: "nickdas17@gmail.com",
                subject: "Please verify your email address",
                text: `
                    Thanks for signing up! To verify your email, click here:
                    ${process.env.PROD_URI || "http://localhost:3000"}/verify-email/${verificationString}
                `,
            });
        } catch (e) {
            res.sendStatus(500);
        }

        jwt.sign(
            {
                id: insertedId,
                email,
                username,
                info,
                isVerified: false,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
            (err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.status(200).json({ token });
            }
        );
    },
};
