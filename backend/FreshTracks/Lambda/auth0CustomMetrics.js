var AWS = require('aws-sdk')
var cloudwatch = new AWS.CloudWatch();

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST"
}

exports.handler = async(event, context) => {
    var date = new Date();
    var timestamp = date.toISOString();
    var params = {
        MetricData: [
            {
              "MetricName": "Logins",
              "Dimensions":[
                  {
                    "Name":"user",
                    "Value":"Benjasl@amazon.com",
                  },
              ],
              "Timestamp": timestamp,
              "Value": 1.0,
              "Unit": "None"
            }
          ],
        Namespace: 'FreshTracks/loginSuccess' /* required */
      };
      cloudwatch.putMetricData(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });
}