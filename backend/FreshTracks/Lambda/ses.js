/*
  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict'
const AWSXRay = require('aws-xray-sdk-core')
const AWS = AWSXRay.captureAWS(require('aws-sdk'))
const SES = new AWS.SES()
const { metricScope } = require("aws-embedded-metrics");
var ColdStart = true;


const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Content-Type",
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

  const formData = JSON.stringify(event.body,null,2)
        // Build params for SES
        const emailParams = {
          Source: process.env.ValidatedEmail, // SES SENDING EMAIL
          ReplyToAddresses: [process.env.ValidatedEmail],
          Destination: {
            ToAddresses: [process.env.ValidatedEmail], // SES RECEIVING EMAIL
          },
          Message: {
            Body: {
              Text: {
                Charset: 'UTF-8',
                Data: formData
              },
            },
            Subject: {
              Charset: 'UTF-8',
              Data: 'New Form submission'
            },
          },
        }
    try {
        var data = await SES.sendEmail(emailParams).promise()
    }
    catch (err) {
        console.log(err)
        return err
    }
    console.log(data)
    await metrics.flush();
       return {
          statusCode: 200,
          body: 'OK!',
          headers        
      }
    });

    exports.handler = metricsaggr;