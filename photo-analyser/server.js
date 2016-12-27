const express = require('express');
const analyser = require("./lib/ImageAnalyser.js")();

const app = express();

app.post('/analyse', function (req, res) {
    const URL = req.headers['url'];
    let message = "url not found in header";
    let statusCode = 400;
    if (URL) {
        statusCode = 202;
        message = "";
        analyser(URL);
    }

    res.status(statusCode);
    res.send(message);
})

const args = process.argv.slice(2);
let port = 9000;
if (args.length == 1) {
    port = args[0];
}
app.listen(port);




