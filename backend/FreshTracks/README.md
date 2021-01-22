
# Fresh Tracks - backend

## Deploying the backend resources
1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.

1. [Install the AWS Serverless Applicaiton Model](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) CLI (SAM CLI)

1. Clone the repo onto your local development machine using `git clone`.


1. From the command line, change directory into `backend/FreshTracks` then run:

```bash
sam build
sam deploy --guided
```

5. Enter in the parameters when prompted:

```bash
 Stack Name [sam-app]: freshtracksTest
        AWS Region [us-east-1]: eu-west-2
        Parameter Auth0Domain [YourAuth0DOmain]: serverlessda.us.auth0.com
        Parameter Auth0Audience [auth0Audience]: https://freshtracks.awsserverlessdemo.com
        Parameter Auth0ClientId [YourAPIIdentifier]: RzYfceEy8a0ZPhoj1jAJPv2bCJfyuzXO
        #Shows you resources changes to be deployed and require a 'Y' to initiate deploy
        Confirm changes before deploy [y/N]: n
        #SAM needs permission to be able to create roles to connect to the resources in your template
        Allow SAM CLI IAM role creation [Y/n]: y
        Save arguments to configuration file [Y/n]: y
        SAM configuration file [samconfig.toml]: 
        SAM configuration environment [default]: 
```
## Adding the stack outputs to the front end
The stack outputs must be saved as environment variables for the front end application. 
* If deploying the front end to your local machine, save these in an .env file in the application root folder.
* if hosting the front end on AWS Amplify, use the [following guide](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html) to create environment variables.


```bash
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Outputs                                                                                                                                                                                                                                                                                     
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Key                 VUEAPPAuth0Audience                                                                                                                         
Description         front end env VUE_APP_Auth0_Audience: your Auth0 API audience identifier e.g.  https://myfreshtracks.com                                                                                                                                                                
Value               https://example.com                                                                                                                                                               

Key                 VUEAPPAwsIoTEndpoint                                                                                                                                                                                                                                                    
Description         front end env VUE_APP_AwsIoTEndpoint: Cognito Identity pool for IoT                                                                                                                                                                                                     
Value               go to IOT > Things > fresh-tracks-realtime > Interact. to find the Endpoint                                                                                                                                                                                                                     

Key                 VUEAPIAPIGWURL                                                                                                                                                                                                                                                          
Description         front end env APP_APIGW_URL: your API endpoint                                                                                                                                                                                                                          
Value               https://example.execute-api.eu-west-2.amazonaws.com/Prod                                                                                                                                                                                                             

Key                 VUEAPPAuth0Domain                                                                                                                                                                                                                                                       
Description         front end env VUE_APP_Auth0_Domain:  Your Auth0 App account domain.                                                                                                                                                                                                     
Value               example.us.auth0.com                                                                                                                                                                                                                                               

Key                 VUEAPPAuth0ClientId                                                                                                                                                                                                                                                     
Description         front end env VUE_APP_Auth0_ClientId: your Auth0 API audience identifier (is your Auth0 Client ID)                                                                                                                                                                      
Value               example1234567                                                                                                                                                                                                                                        

Key                 VUEAPPAWSRegion                                                                                                                                                                                                                                                         
Description         front end env VUE_APP_AWSRegion: AWS deployment region                                                                                                                                                                                                                  
Value               example-west-2   
```
> :warning: **`VUE_APP_IdentityPoolId`** Is not output by the cloudformation stack, to find this go to:
 **`IOT`** > **Things** > **fresh-tracks-realtime** > **Interact**.


# Example: The output above would be saved like so:

### **`.env`**
```bash
VUE_APP_APIGW_URL=https://example.execute-api.eu-west-2.amazonaws.com/Prod
VUE_APP_AWSRegion=us-west-2

VUE_APP_Auth0_Audience=https://example.com
VUE_APP_Auth0_ClientId=example1234567
VUE_APP_Auth0_Domain=example.us.auth0.com

VUE_APP_AwsIoTEndpoint=example-ats.iot.us-west-2.amazonaws.com
VUE_APP_IdentityPoolId=us-west-1:####-####-####-####
```