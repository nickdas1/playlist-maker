const { google } = require("googleapis");
require("dotenv").config();

module.exports.oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.PROD_URI + "auth/google/callback" || "http://localhost:8080/auth/google/callback"
);
