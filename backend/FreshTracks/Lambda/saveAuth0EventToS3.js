let AWS = require('aws-sdk')
let s3bucket = new AWS.S3();

 exports.handler = async(event, context) => {
  let date = new Date();
  let timestamp = date.toISOString();
  let header =''
  let body=''
  let output='';
  let file =''
  
  header+="'date',"
  header+="'type',"
  header+="'connection',"
  header+="'connection_id',"
  header+="'client_id',"
  header+="'client_name',"
  header+="'user_agent',"
  header+="'hostname',"
  header+="'user_id',"
  header+= "'user_name',"
  header+="'log_id'"

  body += "'"+event.detail.data.date+"',"
  body += "'"+event.detail.data.type+"',"
  body += "'"+event.detail.data.connection+"',"
  body += "'"+event.detail.data.connection_id+"',"
  body += "'"+event.detail.data.client_id+"',"
  body += "'"+event.detail.data.client_name+"',"
  body += "'"+event.detail.data.user_agent+"',"
  body += "'"+event.detail.data.hostname+"',"
  body += "'"+event.detail.data.user_id+"',"
  body += "'"+event.detail.data.user_name+"',"
  body += "'"+event.detail.data.log_id+"'"

  output = header+"\r\n"+body;
  let myBody = Buffer.from(output);
  
  let param = {
    Bucket: process.env.AuthLogBucket,
    Key: 'auth0/'+event.detail.data.type+'/'+event.detail.data.user_name+'/'+timestamp.toString()+'.csv',
    Body: myBody
  };
  
  try{
      file = await s3bucket.putObject(param).promise()
  }catch(err){
        console.log(err)
  }
return file

}