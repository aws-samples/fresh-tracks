const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));

const documentClient = new AWS.DynamoDB.DocumentClient();

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

  let formData = event.body

  let params = {
    TableName : process.env.FreshTracksDatabaseTable,
    Item: {
      ID: Math.floor(Math.random() * Math.floor(10000000)).toString(),
      gpxFile: event.detail.requestParameters.Host+'/'+event.detail.requestParameters.key,   //stringify to store against empty responses in form 
      created: Math.floor(Date.now() / 1000),
      metadata:event.Metadata.body,
      key:event.detail.requestParameters.key,
      user_id:event.detail.requestParameters['x-amz-meta-user-id']
    }
  }
  try {
      let data = await documentClient.put(params).promise()
      metrics.putMetric("SavedDBRecord", 1, "Count");
      metrics.setProperty("DBRecord", params.Item);
  }
  catch (err) {
      console.log(err)
      metrics.putMetric("ErrorDBRecord", 1, "Count");
      return err
  }
  return {
        statusCode: 200,
        body: 'OK!',
        headers,
    }
});

exports.handler = metricsaggr;