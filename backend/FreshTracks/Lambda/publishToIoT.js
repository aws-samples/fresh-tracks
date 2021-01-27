const AWS = require('aws-sdk')
const iot = new AWS.Iot({apiVersion: '2015-05-28'});
const { metricScope } = require("aws-embedded-metrics");
var ColdStart = true;

const metricsaggr = metricScope(metrics => async(event, context) => {
    metrics.setNamespace("FreshTracks");
    if (ColdStart) {
        metrics.putMetric("ColdStart-", 1, "Count");
        ColdStart = false;
    } else {
        metrics.putMetric("WarmStart-", 1, "Count");
    }  

    var params = {endpointType: 'iot:Data'};
    const iotDataRes = await   iot.describeEndpoint(params).promise();
    
    const iotdata = new AWS.IotData({endpoint:iotDataRes.endpointAddress})
    const userid= event.detail.requestParameters['x-amz-meta-user-id']
    const MyPayload = JSON.stringify({"message": "Hello from AWS IoT console"})
    const res = await iotdata.publish({topic:'UpdateTable-'+userid,  qos: 0, payload: MyPayload, }).promise();
       
    return res

});
exports.handler = metricsaggr;