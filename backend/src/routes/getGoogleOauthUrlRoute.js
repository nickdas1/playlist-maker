const { getGoogleOauthURL } = require("../util/getGoogleOauthUrl");

module.exports.getGoogleOauthUrlRoute = {
    path: "/auth/google/url",
    method: "get",
    handler: (req, res) => {
        const url = getGoogleOauthURL();
        res.status(200).json({ url });
    },
};
