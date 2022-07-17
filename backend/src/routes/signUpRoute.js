import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

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

        const passwordHash = await bcrypt.hash(password, 10);

        const info = {
            favoriteGenre: "",
            favoriteArtist: "",
            favoriteSong: "",
        };

        const result = await db.collection("users").insertOne({
            email,
            passwordHash,
            info,
            isVerified: false,
        });
        const { insertedId } = result;

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
