const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const dynamoClient = new AWS.DynamoDB()    
const { metricScope } = require("aws-embedded-metrics");
var ColdStart = true;


const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type,Authorization",
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
  let params = {
    TableName:  process.env.FreshTracksDatabaseTable,
    IndexName: "user_id-index",
    KeyConditionExpression:"#ind = :ind",
    ExpressionAttributeNames: {
        "#ind":"user_id",
        
    },
    ExpressionAttributeValues: {
      ":ind": {"S":event.queryStringParameters.user_id},
    }
}
  try {
      data = await dynamoClient.query(params).promise()
      console.log(data)
  }
  catch (err) {
      console.log(err)
      return err
  }
  await metrics.flush();
  return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers,
    }
  });

  exports.handler = metricsaggr;