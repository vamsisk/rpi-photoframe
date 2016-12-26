module.exports = ExifInfo => (URL, callback) => {
    var request = require('request');
    let ExifImage = require('exif').ExifImage;
    const processExif = (pathOrData) => {
        try {
            new ExifImage({image: pathOrData}, (error, exifData) => {
                let imageInfo = {};
                if (exifData) {
                    imageInfo = exifData;
                } else {
                    var parser = require('exif-parser').create(pathOrData);
                    let info = parser.parse();
                    imageInfo.image = {};
                    imageInfo.image.XResolution = info.imageSize.width;
                    imageInfo.image.YResolution = info.imageSize.height;
                }
                callback(imageInfo);
            });
        } catch (error) {

        }
    }

    if (URL.toLowerCase().indexOf("http") == 0) {
        request(URL, {encoding: 'binary'}, (error, response, body) => {
            processExif(new Buffer(body, "binary"));
        });
    } else {
        processExif(URL);
    }

}