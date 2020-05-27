var AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient()    



const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST"
}

exports.handler = async(event, context) => {
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
  }
  catch (err) {
      console.log(err)
      return err
  }
  return {
        statusCode: 200,
        body: 'OK!',
        headers,
    }
}