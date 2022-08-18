const jwt = require("jsonwebtoken");
const { getGoogleUser } = require("../util/getGoogleUser");
const { updateOrCreateUserFromOauth } = require("../util/updateOrCreateUserFromOauth");

module.exports.googleOauthCallbackRoute = {
    path: "/auth/google/callback",
    method: "get",
    handler: async (req, res) => {
        const { code } = req.query;

        const oauthUserInfo = await getGoogleUser({ code });
        const updatedUser = await updateOrCreateUserFromOauth({
            oauthUserInfo,
        });

        const { _id: id, isVerified, email, username, info } = updatedUser;

        jwt.sign(
            { id, isVerified, email, username, info },
            process.env.JWT_SECRET,
            (err, token) => {
                if (err) return res.sendStatus(500);
                res.redirect(`${process.env.PROD_URI || "http://localhost:3000"}/login?token=${token}`);
            }
        );
    },
};
