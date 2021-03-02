const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const DynamoDB = new AWS.DynamoDB()   
const s3 = new AWS.S3();
var bucketName = process.env.FreshTracksS3Bucket
const { metricScope } = require("aws-embedded-metrics");
var ColdStart = true;

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}
const metricsaggr = metricScope(metrics => async(event, context) => {
    metrics.setNamespace("FreshTracks");
    if (ColdStart) {
        metrics.putMetric("ColdStart-", 1, "Count");
        ColdStart = false;
    } else {
        metrics.putMetric("WarmStart-", 1, "Count");
    }  
  let dynamoData=''
  let  file ={}
    let params = {
        TableName: process.env.FreshTracksDatabaseTable,
            Key: {
               "ID": {
                 S: event.queryStringParameters.ID
                }, 
            }
        }
        
  try {
      dynamoData = await DynamoDB.getItem(params).promise()
      
  }
  catch (err) {
      console.log(err)
      return err
  }
  
  
   params = {
        Bucket: process.env.FreshTracksS3Bucket,
        Key: dynamoData.Item.key.S,
    }
    try{
       file = await s3.getObject(params).promise()
    }catch(err){
         console.log(err)
    }

     const response = {
         statusCode: 200,
         body: JSON.stringify(file.Body.toString()),
         headers
     };
     metrics.putMetric("TracksViewed", 1, "Count");
    return response;
});

exports.handler = metricsaggr;