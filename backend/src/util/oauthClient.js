const { google } = require("googleapis");

module.exports.oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.PROD_URI || "http://localhost:8080" + "/auth/google/callback"
);
