const { MongoClient } = require("mongodb");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";

let client;

module.exports.initializeDbConnection = async () => {
    client = await MongoClient.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports.getDbConnection = (dbName) => {
    const db = client.db(dbName);
    return db;
};
