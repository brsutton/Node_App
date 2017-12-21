var AWS = require('aws-sdk');

exports.getUserFromDatabase = function (username) {

    
    AWS.config.update({ region: 'us-east-1' });
    var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    var params = {
        TableName: 'node_web_app_users',
        Key: { 'username': username }
    };

    return new Promise(function (resolve, reject) {
        docClient.get(params, function (err, data) {
            if (err) {
                reject(null);
            } else {
                resolve(data.Item);
            }
        });

    });
};