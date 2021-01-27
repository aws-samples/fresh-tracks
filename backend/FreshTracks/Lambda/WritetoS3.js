const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
var s3 = new AWS.S3();
var bucketName = process.env.AWS_BUCKET_NAME
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
    
    let data=''
    //const ts = Date.now();
    var params = {
        Bucket: bucketName,
        Key: event.body.filePath,
        Expires: 3600,
        ContentType: event.body.contentType
    }
    
    try{
        data = await s3.getSignedUrlPromise('putObject', params)
    }catch(err){
         console.log(err)
    }
    await metrics.flush();
    return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers,
    }
});

exports.handler = metricsaggr;