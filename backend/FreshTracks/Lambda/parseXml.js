var AWS = require('aws-sdk');
var GPX = require("gpx-parse");
const s3 = new AWS.S3();


const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

exports.handler = async(event, context) => {

//first we get the XML GPX data from the file
    var params = { 
        Bucket: event.detail.requestParameters.bucketName,
        Key: event.detail.requestParameters.key,
    };
//we need to do to string on th3 binary first
    const s3String = await s3.getObject(params).promise();

    let gpx = s3String.Body.toString()
    let gpxMeta={'name':'FreshTracks-'+Date.now(),'length':0,'time':new Date()}
    //let gpxTrack=''
    gpx = gpx.replace('\"', '"').replace('\\n', '');

    GPX.parseGpx(gpx, function(error, data) {

        if(typeof data !== 'undefined'){
            //likely no version data
            gpxMeta={'name':data.tracks[0].name,'length':data.tracks[0].length(),'time':data.metadata.time}
        }

    });


     return {
            statusCode: 200,
            body: JSON.stringify({gpxMeta:gpxMeta}),
            headers,
        }
}