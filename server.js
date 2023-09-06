const { Socket } = require("socket.io");

const express = require("express");

const app = express();
const http = require("http").createServer(app);
const path = require("path");
const port = 3000;

/**
 * @type {Socket}
 */
const io = require("socket.io")(http);

require("dotenv").config();

const secretToken = process.env.SECRET_TOKEN;

app.use("/jquery", express.static(path.join(__dirname, "node_modules/jquery/dist")));
app.use("/style.css", express.static(path.join(__dirname, "style.css")));
app.use("/client.js", express.static(path.join(__dirname, "client.js")));
app.use("/penny-lane.otf", express.static(path.join(__dirname, "penny-lane.otf")));
app.use("/penny-lane-bold.otf", express.static(path.join(__dirname, "penny-lane-bold.otf")));

app.get("/*", (req, res) => {
    const pass = req.query.pass;
    if (pass === secretToken) {
        res.sendFile(path.join(__dirname, "index.html"));
    } else {
        res.send("You are not allowed to access to the scoreboard.");
    }
});

http.listen(port, () => {
    console.log(`App server is running on port ${port}`);
});

io.on("connection", (socket) => {

});