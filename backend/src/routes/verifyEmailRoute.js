import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

export const verifyEmailRoute = {
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

        const { _id: id, email, info } = result;

        await db.collection("users").updateOne(
            { _id: ObjectId(id) },
            {
                $set: { isVerified: true },
            }
        );

        jwt.sign(
            { id, email, isVerified: true, info },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
            (err, token) => {
                if (err) return res.sendStatus(500);
                res.status(200).json({ token });
            }
        );
    },
};
