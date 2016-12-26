module.exports = VisionInfo => (URL, callback) => {
    var request = require('request');
    var options = {
        url: 'https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Categories&language=en',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key':'527ba5cd458e407bad738a8987a0a8f2'
        },
        data : {
            'url' : URL
        }
    };

    request(options,callback);
}