let exifInfo = require('./ExifInfo.js')();
let visionInfo = require('./VisionInfo.js')();

module.exports = pipleLine => (URL) => {
    let imageData = {imageInfo: {}, visionInfo: {}, path: URL};

    const processVisionInfo = (error, response, body) => {
        imageData.visionInfo = body;
        console.log(imageData);
    }
    const processExifInfo = (exifData) => {
        imageData.imageInfo = exifData;
        visionInfo(URL, processVisionInfo);
    }

    exifInfo(URL, processExifInfo);

}





