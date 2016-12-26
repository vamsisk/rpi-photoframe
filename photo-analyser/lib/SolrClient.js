let config = require('../Config').solr;
module.exports = SolrClient => (imageData) => {
    let request = require('request');
    let options = {
        url: config.URL,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        json: imageData
    };
    request(options, (error, response, body) => {
        let message = body;
        if (error) {
            message = error;
        }
        console.log(imageData.path + " - Solr - " + message)
    });
}
