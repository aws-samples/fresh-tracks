# Fresh Tracks 
A custom-built serverless application built in Vue.js to demonstrate multiple SaaS integrations into AWS with EventBridge.

![Fresh Tracks](/public/images/FTfrontPage.png "Fresh Tracks")

## Learn about FreshTracks 3P SaaS integrations:
- [Auth0](https://github.com/bls20AWS/Amazon-EventBridge-Integration-with-Auth0)
- Zendesk (comming soon)
- Datadog (comming soon)

## Deploying the front-end application

- Clone the repo onto your local development machine:
```bash
git clone
 ```
- cd into the root directoy and run:

```bash
npm install
```

- Run the application locally:
```bash
npm run serve
```

## Configuration
### Authentication - Auth0 Integration

The project needs to be connected to an Auth0 application in order for the authentication flow to work.

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
1. Register a [single page applicaiton](https://auth0.com/docs/dashboard/guides/applications/register-app-spa)
1. Add `http://localhost:3000` to the `Allowed Callback URLs`, `Allowed Logout URLs`, and `Allowed Web Origins` in your applicaiton settings.
1. You must configure the front end applicaiton with your Auth0 domain and client ID.

You can do this in 1 of 2 ways:
#### Option 1 (prefered) - use environment variables:
create a .env file in the root directory and provide the following values:

```bash
VUE_APP_Auth0_Domain = <YOUR AUTH0 DOMAIN>
VUE_APP_Auth0_ClientId = <YOUR AUTH0 CLIENT ID>
VUE_APP_Auth0_Audience = <API_IDENTIFIER>
```

#### Option 2 - use a json config file:

To do this alter the /src/auth/auth_config.json file with your Auth0 credentials:
```javascript
{

  "domain": "<YOUR AUTH0 DOMAIN>",
  "clientId": "<YOUR AUTH0 CLIENT ID>",
  "audience": "<API_IDENTIFIER>"
}
```
Then in `/src/main.js`:
1.  uncomment `import { domain,clientId,audience } from "./auth/auth_config.json";`
1.  comment out:
```javascript
var domain = process.env.VUE_APP_Auth0_Domain
var clientId = process.env.VUE_APP_Auth0_ClientId
var audience = process.env.VUE_APP_Auth0_Audience
```

### HelpWidget - Zendesk Integration
FreshTracks uses Zendesk's [Web Widget](https://www.zendesk.com/embeddables/) to provide a curated self service knowldge repository.

In order to configure this for your own Zendesk account you'll need to replace the Zendesk widget script located in `public/index.html` with your own Zendesk web widget script. to locate this:

In your Zendesk Dashboard:
  1. Click the Admin icon in the sidebar, then select Channels > Widget.
  1. Click the Setup tab, if it is not already selected.
  1. Under the code box, click Copy to clipboard.
  1. Paste this into `public/index.html`, replacing the existing script.

Some further customizations have been made in `/src/components/NavBar.vue`.
These include the insertion of a custom form, delared by the form ID.  You can use your own custom forms here:

[Creating custom Zendesk Forms](https://support.zendesk.com/hc/en-us/articles/203661616-Creating-multiple-ticket-forms-to-support-different-request-types-Professional-add-on-and-Enterprise-)

## Deploying the backend application
[See this guide](/backend/FreshTracks/) to deploy the back end resources and services

![Fresh Tracks - Core architecture](/public/images/architecture1.png "Fresh Tracks")

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section.

## License

This project is licensed under the MIT license. See the [LICENSE](../LICENSE) file for more info.
