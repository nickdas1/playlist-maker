const sendgrid = require("@sendgrid/mail");
require("dotenv").config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = ({ to, from, subject, text, html }) => {
    const msg = { to, from, subject, text, html };
    return sendgrid.send(msg);
};
