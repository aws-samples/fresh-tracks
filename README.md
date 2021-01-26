# Fresh Tracks 
An event driven serverless web application built in Vue.js. This example app allows you to upload `.gpx` files to view your tracked activities.  Try it out at [MyFreshTracks.com](https://myfreshtracks.com)

> :information_source:  set up and deployment time is approximately **10 mins**.

> :information_source: **This application uses [Auth0](https://auth0.com/signup)** to manage and Authenticate users. You must create a demo app in Auth0 before you can login, or deploy the backend resources. See "Authentication - Auth0" below.



![Fresh Tracks](/public/images/FTfrontPage.png "Fresh Tracks")


## Deploying the front-end application locally:

- Clone the repo onto your local development machine:
```bash
git clone
 ```
- `cd` into the root directoy and run:

```bash
npm install
```

- Run the application locally:

```bash
npm run serve
```


## Deploying the backend application
This application uses many AWS services to power the backend: [See this guide](/backend/FreshTracks/) to deploy the back end resources and services

![Fresh Tracks - Core architecture](/public/images/architecture1.png "Fresh Tracks")


### Authentication - Auth0
The project needs to be connected to an Auth0 application in order for the authentication flow to work.

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
1. Register a [single page applicaiton](https://auth0.com/docs/dashboard/guides/applications/register-app-spa)
1. Add your domain (`http://localhost:3000`, if deploying locally) to the `Allowed Callback URLs`, `Allowed Logout URLs`, and `Allowed Web Origins` in your applicaiton settings.

1. Configure the front end applicaiton with your Auth0 domain and client ID.
#### Option 1 (prefered) - use environment variables:
create a .env file in the root directory and provide the following values:

```bash
VUE_APP_Auth0_Domain = <YOUR AUTH0 DOMAIN>
VUE_APP_Auth0_ClientId = <YOUR AUTH0 CLIENT ID>
VUE_APP_Auth0_Audience = <API_IDENTIFIER>
```

## Learn about FreshTracks 3P SaaS integrations:
- [Auth0](https://github.com/aws-samples/amazon-eventbridge-integration-with-auth0) - Analyse user events to create an Amazon QuickSight
- [Zendesk](https://github.com/aws-samples/amazon-eventbridge-integration-with-zendesk) - An automated  self-service Knowledge repository


## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section.

## License

This project is licensed under the MIT license. See the [LICENSE](../LICENSE) file for more info.
