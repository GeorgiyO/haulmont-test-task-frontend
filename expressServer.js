const express = require("express");

const app = express();

app.get("/public/bundle.js", (req, res) => {
    res.sendFile(__dirname + "/public/bundle.js");
});

app.get("/**", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(80, () => {console.log("server started")});
