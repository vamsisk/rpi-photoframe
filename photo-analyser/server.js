const express = require('express');
const analyser = require("./lib/ImageAnalyser.js")();
const config = require('./Config.js');

const app = express();
app.config = config;
app.use(express.static("static"));
app.post('/analyse', (req, res) => {
    const URL = req.headers['url'];
    let message = "url not found in header";
    let statusCode = 400;
    if (URL) {
        if (isSupportedFileTye(URL, req.app.config.supportedFormats)) {
            statusCode = 202;
            message = "";
            analyser(URL);
        } else {
            message = "Invalid format or format not supported";
        }
    }

    res.status(statusCode);
    res.send(message);
})

const args = process.argv.slice(2);
let port = args[0] || 9000;

app.listen(port);

const isSupportedFileTye = (url, supportedFormats) => {
    let index = url.lastIndexOf(".");
    if (index != -1) {
        return supportedFormats.indexOf(url.substring(index + 1)) != -1;
    } else {
        return false;
    }
}




