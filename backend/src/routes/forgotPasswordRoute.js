const { v4: uuid } = require("uuid");
const { getDbConnection } = require("../db");
const { sendEmail } = require("../util/sendEmail");

module.exports.forgotPasswordRoute = {
    path: "/api/forgot-password/:email",
    method: "put",
    handler: async (req, res) => {
        const { email } = req.params;

        const db = getDbConnection("playlister");
        const passwordResetCode = uuid();

        const result = await db.collection('users')
            .updateOne({ email }, { $set: { passwordResetCode } });

        if (result.modifiedCount > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: "nickdas17@gmail.com",
                    subject: "Password Reset",
                    text: `
                        To reset your password, click this link:
                        ${process.env.PROD_URI || "http://localhost:3000"}/reset-password/${passwordResetCode}
                    `,
                });
            } catch (e) {
                res.sendStatus(500);
            }
        }

        res.sendStatus(200);
    },
};
