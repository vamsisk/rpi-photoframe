module.exports = pipleLine => (URL) => {

    let exifInfo = require('./ExifInfo.js')();
    let visionInfo = require('./VisionInfo.js')();
    let request = require("request");
    let fs = require("fs");
    let Stream = require('stream').Transform;
    let imageData;

    const processVisionInfo = (error, response, body) => {
        if (imageData) {
            imageData.visiondata = body;
            console.log(imageData);
        }else{
            console.log(body);
        }

    }
    const processExifInfo = (error, exifData) => {
        imageData = exifData;
        visionInfo(URL, processVisionInfo);
    }

    request(URL, (error, response, body) => {
        exifInfo(new Buffer(body), processExifInfo);
    });
}





