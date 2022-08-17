const express = require("express");
const { routes } = require("./routes");
const { initializeDbConnection } = require("./db");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../../frontend/build")));

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach((route) => {
    app[route.method](route.path, route.handler);
});

app.get("*", (req, res) => {
    res.sendFile(
        path.resolve(__dirname, "../../frontend/build", "index.html")
    );
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
