var AWS = require('aws-sdk');
var cloudVersion = require('../config/cloud-version.js');

exports.getUserFromDatabase = function (username) {

    AWS.config.update({ region: cloudVersion.region });
    var docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: cloudVersion.apiVersion });
    var params = {
        TableName: 'node_web_app_users',
        Key: { 'username': username }
    };

    return docClient.get(params).promise();
};