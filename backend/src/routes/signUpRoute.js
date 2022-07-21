import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { getDbConnection } from "../db";
import { sendEmail } from "../util/sendEmail";

export const signUpRoute = {
    path: "/api/signup",
    method: "post",
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection("spotifyre");
        const user = await db.collection("users").findOne({ email });

        if (user) {
            res.sendStatus(409);
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
                    http://localhost:3000/verify-email/${verificationString}
                `,
            });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }

        jwt.sign(
            {
                id: insertedId,
                email,
                info,
                isVerified: false,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.status(200).json({ token });
            }
        );
    },
};
