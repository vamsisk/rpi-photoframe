'use strict';
console.log('Loading receive-email function');

var aws = require('aws-sdk');

var MailParser = require("mailparser").MailParser;

var fs = require("fs");
var path = require('path');

exports.handler = (event, context, callback) => {
    const messageId = event.Records[0].ses.mail.messageId;
    console.log('Reveived message ID: ', messageId);
    processEmail(messageId);
};

function processEmail(messageId) {
    var params = {
        Bucket: 'digital-photoframe-lib',
        Key: 'emails-received/'+messageId,
        ResponseCacheControl: 'no-cache'
    };
    
    var s3 = new aws.S3({signatureVersion: 'v4'});
    var mailparser = new MailParser({debug:false});

    s3.getObject(params, function(err, data) {
        if (err) {
            console.log(err);
            var message = "Error getting object  from bucket. Make sure they exist and your bucket is in the same region as this function.";
            console.log(message);
        } else {
            console.log(params);
            console.log('CONTENT TYPE getObject:', data.ContentType);
            console.log('Data:', data);
            mailparser.write(data.Body);
            mailparser.end();
        }
    });
    mailparser.on("end", function(mail){
        console.log('Email is from: ', mail.from); // object structure for parsed e-mail
        console.log('Email subject: ', mail.subject);
        console.log('Number of attachments: ', mail.attachments.length);
        mail.attachments.forEach(function(attachment) {
            console.log(attachment.fileName);
            var bitmapFileContent = new Buffer(attachment.content, 'base64');
            var file = attachment.fileName;
            var ext = path.extname(file);
            var generatedFileName = path.basename(file, ext) + '_' + new Date().getTime() + ext;
            var params = {
                Bucket: 'digital-photoframe-lib',
                Key: 'uploads/'+generatedFileName,
                Body: bitmapFileContent,
                ContentDisposition: 'filename="'+generatedFileName+'"',
                StorageClass: 'STANDARD',
                ACL: 'public-read'
            };
            var s3 = new aws.S3({signatureVersion: 'v4'});
            s3.putObject(params, function(err, putResponseData) {
              if (err) console.log(err, err.stack); // an error occurred
              else     console.log(putResponseData);           // successful response
            });
        });
    });

}

