import { getDbConnection } from "../db";

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    const { id: googleId, verified_email: isVerified, email, name: username } = oauthUserInfo;

    const db = getDbConnection("playlister");
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
        const result = await db
            .collection("users")
            .findOneAndUpdate(
                { email },
                { $set: { googleId, isVerified, username } },
                { returnOriginal: false }
            );

        return result.value;
    } else {
        const result = await db.collection("users").insertOne({
            email,
            username,
            googleId,
            isVerified,
            info: {},
        });

        return result.insertedId;
    }
};
