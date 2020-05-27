
# Fresh Tracks

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.

1. [Install the AWS Serverless Applicaiton Model](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) CLI (SAM CLI)

1. Clone the repo onto your local development machine using `git clone`.


1. in the template.yaml replace the following parameters with your own credentials:

```yaml
Auth0EventBusName:
    Type: String
    Description: A valid custom Event Bus for Auth0 Events.
    MaxLength: 150
    MinLength: 4
    Default: "aws.partner/auth0.com/###########/auth0.logs"
    AllowedPattern : ".+"

  Auth0Domain:
    Type: String
    Description: Your Auth0 App account domain.
    MaxLength: 150
    MinLength: 4
    Default: "https://YourAuth0DOmain"
    AllowedPattern : ".+"

  Auth0Audience:
    Type: String
    Description: your Auth0 API audience identifier.
    MaxLength: 150
    MinLength: 4
    Default: "https://YourAPIIdentifier"
    AllowedPattern : ".+"

  ZendeskEventBusName:
    Type: String
    Description: A valid custom Event Bus for Auth0 Events.
    MaxLength: 150
    MinLength: 4
    Default: "aws.partner/zendesk.com/######/default"
    AllowedPattern : ".+"

  ZenDeskDomain:
    Type: String
    Description: Valid Zendesk domain.
    MaxLength: 150
    MinLength: 4
    Default: "example-domain.zendesk"
    AllowedPattern : ".+"

  ZenDeskPassword:
    Type: String
    Description: Valid Zendesk Password.
    MaxLength: 150
    MinLength: 4
    Default: "abcfedghijllmnop12345678"
    AllowedPattern : ".+"

  ZenDeskUsername:
    Type: String
    Description: Valid Zendesk Username.
    MaxLength: 150
    MinLength: 4
    Default: "email@address.com"
    AllowedPattern : ".+"
```

1. From the command line, change directory into `backend/FreshTracks` then run:

```bash
sam build
sam deploy --guided
```
You could also deploy with --parameter-overrides to replace parameter values without having to change the template.yaml, eg:

```bash
sam deploy --parameter-overrides ZendeskEventBusName=aws.partner/zendesk.com/0000000/default ZenDeskDomain=account.zendesk ZenDeskPassword=12345 ZenDeskUsername=agentEmailAddress Auth0EventBusName=aws.partner/auth0.com/00000/auth0.logs
```