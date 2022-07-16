const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost:27017/spotifyre", { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open");
    })
    .catch((e) => {
        console.log("error: ", e);
    });

const schema = new mongoose.Schema({})
const Song = mongoose.model('songs', schema);

app.listen(3001, () => {
    console.log("listening on port 3001");
});

app.get("/", async (req, res) => {
    const songs = await Song.find({});
    console.log(songs);
    res.send(songs);
});
