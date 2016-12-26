let request = require('request');
let config = require('../Config').vision;

module.exports = VisionInfo => (URL, callback) => {
    let options = {
        url: config.URL,
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': config.key
        },
        method: "POST",
        json: {
            'url': URL
        }
    };
    request(options, callback);
}