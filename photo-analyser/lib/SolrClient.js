let config = require('../Config').solr;
module.exports = SolrClient => (imageData) => {
    let request = require('request');

    let indexData = [];
    let exif = imageData.imageInfo.exif || {};

    let data = {
        path: imageData.path,
        Make: imageData.imageInfo.image.Make,
        Model: imageData.imageInfo.image.Model,
        XResolution: imageData.imageInfo.image.imageInfoXResolution,
        YResolution: imageData.imageInfo.image.YResolution,
        DateTimeOriginal: exif.DateTimeOriginal,
        CreateDate: exif.CreateDate,
        width: imageData.visionInfo.metadata.width,
        height: imageData.visionInfo.metadata.height,
        format: imageData.visionInfo.metadata.format,

        categories: [],
        tags: []
    };

    imageData.visionInfo.categories.forEach(category => {
        data.categories.push(category.name);
    })

    imageData.visionInfo.tags.forEach(tag => {
        data.tags.push(tag.name);
    })

    indexData.push(data);

    let options = {
        url: config.URL,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        json: indexData
    };
    request(options, (error, response, body) => {
        let message = body;
        if (error) {
            message = error;
        }
        console.log(JSON.stringify(indexData));
        console.log(imageData.path + " - Solr - " + JSON.stringify(message))
    });
}
