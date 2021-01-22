var AWS = require('aws-sdk')
var s3 = new AWS.S3();
var bucketName = process.env.AWS_BUCKET_NAME

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

exports.handler = async (event, context) => {
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
    
    return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers,
    }
}