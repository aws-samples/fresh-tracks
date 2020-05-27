var AWS = require('aws-sdk')
var s3 = new AWS.S3();
var bucketName = process.env.FreshTracksS3Bucket

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST"
}

exports.handler = async(event, context) => {


let body = JSON.parse(event.body)
    let data=''
    var params = {
        Bucket: bucketName,
        Key: body.filePath,
        Metadata: {
            'user-id': body.user_id,
          },
        Expires: 3600,
       // ContentType: body.contentType
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