const { oauthClient } = require("./oauthClient");

module.exports.getGoogleOauthURL = () => {
    const scopes = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ];

    return oauthClient.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: scopes,
    });
};
