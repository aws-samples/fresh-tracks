const { metricScope } = require("aws-embedded-metrics");

const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))

var GPX = require("gpx-parse");
const s3 = new AWS.S3();

var ColdStart = true;
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

const metricsaggr = metricScope(metrics => async(event, context) => {
//    metrics.putDimensions({ Service: "Function-ParseGPX" });  
    metrics.setNamespace("FreshTracks");
    if (ColdStart) {
        metrics.putMetric("ColdStart-", 1, "Count");
        ColdStart = false;
    } else {
        metrics.putMetric("WarmStart-", 1, "Count");
    }  
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
    metrics.setProperty("GPXMetadata", gpxMeta);
    metrics.putMetric("TracksUploaded", 1, "Count");
    });

    return {
        statusCode: 200,
        body: JSON.stringify({gpxMeta:gpxMeta}),
        headers,
    }
});

exports.handler = metricsaggr;