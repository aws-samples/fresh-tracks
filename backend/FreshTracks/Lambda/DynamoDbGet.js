var AWS = require('aws-sdk');
const dynamoClient = new AWS.DynamoDB()    

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type,Authorization", 
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

exports.handler = async(event, context) => {
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
  return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers,
    }
}