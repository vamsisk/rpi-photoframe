var request = require('request');
exports.handler = (event, context, callback) => {
    event.Records.forEach(record => {
        const imageURL = `https://s3.${record.awsRegion}.amazonaws.com/${record.s3.bucket.name}/${record.s3.object.key}`;
        const options = {
            url: "http://52.15.136.66:9000/analyse",
            headers: {
                'url': imageURL
            },
            method: "POST"
        };
        request(options, (error, response, body) => {
            if (error) {
                console.log(error);
            }

        });
    });


    callback(null, 'Successfully executed lambda');
};