const AWS = require('aws-sdk');
const DynamoDB = new AWS.DynamoDB()   
const s3 = new AWS.S3();
var bucketName = process.env.FreshTracksS3Bucket


const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}
exports.handler = async (event) => {
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
    return response;
};