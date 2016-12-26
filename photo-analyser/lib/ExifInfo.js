module.exports =  ExifInfo => (URL,callback) =>{
    let exifInfo ;
    let ExifImage = require('exif').ExifImage;
    try {
        exifInfo =  new ExifImage({image: URL}, callback);
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}